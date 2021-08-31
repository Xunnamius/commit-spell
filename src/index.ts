import { name as pkgName } from 'package';
import { promises as fs } from 'fs';
import { homedir } from 'os';
import yargs from 'yargs/yargs';
import debugFactory from 'debug';
import spellcheck from 'spellchecker';
import execa from 'execa';
import textExtensions from 'text-extensions';

import type { Arguments, Argv } from 'yargs';

export type Program = Argv;
export type { Arguments };
export type Parser = (argv?: string[]) => Promise<Arguments>;

export type Context = {
  program: Program;
  parse: Parser;
};

const debug = debugFactory(`${pkgName}:parse`);
const { readFile } = fs;

export const GIT_COMMITMSG_PATH = './.git/COMMIT_EDITMSG';

const tryReadFile = async (path: string) => {
  try {
    debug(`attempting to read ${path}`);
    const data = await readFile(path);
    debug(`successfully read ${path}`);
    return data.toString('utf-8');
  } catch (ignored) {
    debug.extend('<warn>')(`failed to read ${path}`);
    return '';
  }
};

const asCSpellJson = (str: string): string[] => {
  try {
    const json = JSON.parse(str);
    debug('json parse successful!');
    return [
      ...(json?.['cSpell.words'] || []),
      ...(json?.['cSpell.userWords'] || []),
      ...(json?.['cSpell.ignoreWords'] || [])
    ];
  } catch (ignored) {
    debug.extend('<warn>')('json parse failed');
    return [];
  }
};

const asText = (item: string) => item.split('\n');
const isPascalCase = (word: string) => /^([A-Z]{2,}.+|[A-Z][a-z]+[A-Z].*)$/.test(word);
const isCamelCase = (word: string) => /^[a-z]+[A-Z]+.*$/.test(word);
const isAllCaps = (word: string) => /^[^a-z]+$/.test(word);

const splitOutWords = (phrase: string) => {
  return [...phrase.split(/[^a-zA-Z]+/g), phrase].filter(Boolean);
};

const keys = (obj?: Record<string, unknown>) => Object.keys(obj || {}).map(splitOutWords);

/**
 * Create and return a pre-configured Yargs instance (program) and argv parser.
 */
export function configureProgram(): Context;
/**
 * Configure an existing Yargs instance (program) and return an argv parser.
 *
 * @param program A Yargs instance to configure
 */
export function configureProgram(program: Program): Context;
export function configureProgram(program?: Program): Context {
  const finalProgram = program || yargs();

  finalProgram
    .scriptName('commit-spell')
    .usage(`$0\n\nChecks the ${GIT_COMMITMSG_PATH} file for spelling errors.`)
    .options({
      silent: {
        alias: 's',
        describe: 'Nothing will be printed to stdout or stderr',
        type: 'boolean'
      },
      'show-all': {
        alias: 'a',
        describe: 'Show all potential misspellings',
        type: 'boolean'
      }
    })
    .string('_')
    .group(['show-all'], 'Spellchecking options:')
    .group(['help', 'version', 'silent'], 'Other options:')
    .example([
      ['$0', 'Stages file1 & commits as "feat: new feature"'],
      ['$0 --show-all', 'Stages file1 & file2 & commits as "feat(file1): new feature"']
    ])
    .strictOptions();

  return {
    program: finalProgram,
    parse: async (argv?: string[]) => {
      argv = argv?.length ? argv : process.argv.slice(2);
      debug('saw argv: %O', argv);

      const finalArgv = await finalProgram.parse(argv || []);
      const lastCommitMsg = await tryReadFile(GIT_COMMITMSG_PATH);
      const homeDir = homedir();

      /* eslint-disable import/no-unresolved */
      const {
        dependencies: pkgDependencies,
        devDependencies: pkgDevDependencies,
        peerDependencies: pkgPeerDependencies,
        scripts: pkgScripts
        // @ts-expect-error: <cwd>/package.json might not exist
      } = (await import('./package.json').catch(() => ({
        dependencies: {},
        devDependencies: {},
        peerDependencies: {},
        scripts: {}
      }))) as {
        dependencies?: Record<string, unknown>;
        devDependencies?: Record<string, unknown>;
        peerDependencies?: Record<string, unknown>;
        scripts?: Record<string, unknown>;
      };
      /* eslint-enable import/no-unresolved */

      debug(`lastCommitMsg: ${lastCommitMsg}`);
      debug(`homeDir: ${homeDir}`);

      const ignoreWords = Array.from(
        new Set(
          [
            ...(await Promise.all([
              tryReadFile('./.spellcheckignore').then(asText),
              tryReadFile(`${homeDir}/.config/_spellcheckignore`).then(asText),
              tryReadFile('./.vscode/settings.json').then(asCSpellJson),
              tryReadFile(`${homeDir}/.config/Code/User/settings.json`).then(asCSpellJson)
            ])),
            ...textExtensions,
            // ? Popular contractions
            ...['ve', 're', 's', 'll', 't', 'd', 'o', 'ol'],
            ...keys(pkgDependencies),
            ...keys(pkgDevDependencies),
            ...keys(pkgPeerDependencies),
            ...keys(pkgScripts),
            ...splitOutWords(
              (await execa('git', ['log', '--format="%B"', 'HEAD~1'])).stdout
            ).slice(0, -1)
          ]
            .flat()
            .filter(Boolean)
            .flatMap((word) => splitOutWords(word.trim().toLowerCase()))
        )
      );

      const typos = Array.from(
        new Set(
          spellcheck
            .checkSpelling(lastCommitMsg)
            .map((typoLocation) =>
              lastCommitMsg.slice(typoLocation.start, typoLocation.end).trim().split("'")
            )
            .flat()
            .filter(
              (word) => !isAllCaps(word) && !isCamelCase(word) && !isPascalCase(word)
            )
            .map((word) => word.toLowerCase())
            .filter((typo) => !ignoreWords.includes(typo))
        )
      );

      debug('typos: %O', typos);

      if (typos.length) {
        const warn = (...args: unknown[]) => {
          // eslint-disable-next-line no-console
          if (!finalArgv.silent) console.warn(...args);
        };

        warn('WARNING: there may be misspelled words in your commit message!');
        warn('Commit messages can be fixed before push with `git commit -S --amend`');
        warn('---');

        for (const typo of finalArgv.showAll ? typos : typos.slice(0, 5)) {
          const corrections = spellcheck.getCorrectionsForMisspelling(typo);
          const suggestion = corrections.length
            ? ` (did you mean ${corrections.slice(0, 5).join(', ')}?)`
            : '';

          warn(`${typo}${suggestion}`);
        }

        if (typos.length) {
          if (!finalArgv.showAll && typos.length > 5) {
            warn(`${typos.length - 5} more...`);
          }

          warn('---');
        }
      }

      return finalArgv;
    }
  };
}
