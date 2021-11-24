/* eslint-disable jest/no-conditional-expect */
import { name as pkgName, bin as pkgBin } from 'package';
import { GIT_COMMITMSG_PATH } from 'universe/index';
import del from 'del';
import debugFactory from 'debug';

import {
  run,
  mockFixtureFactory,
  gitRepositoryFixture,
  dummyDirectoriesFixture,
  dummyFilesFixture
} from './setup';

import type { FixtureOptions } from './setup';

const TEST_IDENTIFIER = 'integration-client';
const CLI_BIN_PATH = `${__dirname}/../${pkgBin['commit-spell']}`;

const debug = debugFactory(`${pkgName}:${TEST_IDENTIFIER}`);

// !!!!! XXX:
// TODO: XXX: ensure when given same directory to create multiple times that the
// TODO: XXX: operation is only performed once (optimization for Fixture pkg)
const fixtureOptions: Partial<FixtureOptions> = {
  // directoryPaths: paths
  //   .filter((p) => p.includes('/'))
  //   .map((p) => p.split('/').slice(0, -1).join('/')),
  // initialFileContents: paths.reduce((obj, path) => {
  //   // ? The file at `path` has contents equal to `path`
  //   obj[path] = path;
  //   return obj;
  // }, {} as FixtureOptions['initialFileContents']),
  use: [dummyDirectoriesFixture(), dummyFilesFixture(), gitRepositoryFixture()]
};

const withMockedFixture = mockFixtureFactory(TEST_IDENTIFIER, fixtureOptions);

beforeAll(async () => {
  if ((await run('git', ['help'])).code != 0) {
    debug(`unable to find main distributable: ${CLI_BIN_PATH}`);
    throw new Error('must build distributables first (try `npm run build-dist`)');
  }

  if ((await run('test', ['-e', CLI_BIN_PATH])).code != 0) {
    debug(`unable to find main distributable: ${CLI_BIN_PATH}`);
    throw new Error('must build distributables first (try `npm run build-dist`)');
  }
});

it('executes when called directly (shebang test)', async () => {
  expect.hasAssertions();

  await withMockedFixture(async ({ root }) => {
    const { code, stdout } = await run(CLI_BIN_PATH, ['--help'], { cwd: root });

    expect(stdout).toInclude('commit-type commit-scope commit-message');
    expect(code).toBe(0);
  });
});

it('errors if called with bad args', async () => {
  expect.hasAssertions();

  await withMockedFixture(async ({ root }) => {
    const { code, stderr } = await run(CLI_BIN_PATH, [], { cwd: root });

    expect(stderr).toInclude('must pass all required arguments');
    expect(code).toBe(1);
  });
});

it('errors if called outside a git repo', async () => {
  expect.hasAssertions();

  await withMockedFixture(async ({ root }) => {
    await del(`${root}/.git`, { force: true });

    const { code, stderr } = await run(
      CLI_BIN_PATH,
      ['path', 'type', 'scope', 'message'],
      { cwd: root }
    );

    expect(stderr).toInclude('not a git repository');
    expect(code).toBe(1);
  });
});

it('errors silently if called with --silent', async () => {
  expect.hasAssertions();

  await withMockedFixture(async ({ root }) => {
    const { code, stdout, stderr } = await run(
      CLI_BIN_PATH,
      ['--silent', 'type', 'scope', 'message'],
      { cwd: root }
    );

    expect(stderr).toBeEmpty();
    expect(stdout).toBeEmpty();
    expect(code).toBe(1);
  });
});

it('warns about spelling errors in commit message', async () => {
  expect.hasAssertions();

  await withMockedFixture(async ({ root }) => {
    const { code, stdout, stderr } = await run(
      CLI_BIN_PATH,
      ['path', 'type', 'scope', 'message'],
      { cwd: root }
    );

    expect(stderr).toBeEmpty();
    expect(stdout).not.toBeEmpty();
    expect(code).toBe(0);
  });
});

it('spellchecks silently if called with --silent', async () => {
  expect.hasAssertions();

  await withMockedFixture(async ({ root }) => {
    const { code, stdout, stderr } = await run(
      CLI_BIN_PATH,
      ['--silent', 'path', 'type', 'scope', 'message'],
      { cwd: root }
    );

    expect(stderr).toBeEmpty();
    expect(stdout).toBeEmpty();
    expect(code).toBe(0);
  });
});

it(`does not error when ${GIT_COMMITMSG_PATH} is empty or does not exist`, async () => {
  expect.hasAssertions();

  await withMockedFixture(async ({ root }) => {
    const { code, stdout, stderr } = await run(
      CLI_BIN_PATH,
      ['path', 'type', 'scope', 'message'],
      { cwd: root }
    );

    expect(stderr).toBeEmpty();
    expect(stdout).not.toBeEmpty();
    expect(code).toBe(0);
  });
});

it('collates word data from whitelists, commit history', async () => {
  expect.hasAssertions();

  await withMockedFixture(async ({ root }) => {
    const { code, stdout, stderr } = await run(
      CLI_BIN_PATH,
      ['path', 'type', 'scope', 'message'],
      { cwd: root }
    );

    expect(stderr).toBeEmpty();
    expect(stdout).not.toBeEmpty();
    expect(code).toBe(0);
  });
});
