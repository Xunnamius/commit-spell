import debugFactory from 'debug';
import { name as pkgName, version as pkgVersion, main as pkgMain } from 'package';
import {
  run,
  mockFixtureFactory,
  dummyNpmPackageFixture,
  webpackTestFixture,
  npmLinkSelfFixture
} from './setup';

import type { FixtureOptions } from './setup';

const TEST_IDENTIFIER = 'integration-webpack';

const pkgMainPath = `${__dirname}/../${pkgMain}`;
const debug = debugFactory(`${pkgName}:${TEST_IDENTIFIER}`);
const webpackVersion = process.env.MATRIX_WEBPACK_VERSION || 'latest';

debug(`webpackVersion: "${webpackVersion}"`);

enum SourceType {
  CJS = 'cjs',
  ESM = 'esm'
}

enum DestType {
  CJS = 'cjs',
  CJS_LIB = 'cjs-library'
}

const fixtureOptions = {
  webpackVersion,
  initialFileContents: {
    'package.json': `{"name":"dummy-pkg","dependencies":{"${pkgName}":"${pkgVersion}"}}`
  } as FixtureOptions['initialFileContents'],
  use: [dummyNpmPackageFixture(), npmLinkSelfFixture(), webpackTestFixture()]
};

const withMockedFixture = mockFixtureFactory(TEST_IDENTIFIER, fixtureOptions);

const runTest = async ({ source, dest }: { source: SourceType; dest: DestType }) => {
  const ext = `${source == SourceType.ESM ? 'm' : ''}js`;
  const indexPath = `src/index.${ext}`;

  fixtureOptions.initialFileContents[indexPath] =
    (source == SourceType.ESM
      ? `import { configureProgram } from '${pkgName}';`
      : `const { configureProgram } = require('${pkgName}');`) +
    `
  console.log(!!configureProgram().program ? 'working' : 'not working');`;

  fixtureOptions.initialFileContents['webpack.config.js'] = `
  module.exports = {
    name: 'dummy',
    mode: 'production',
    target: 'node',
    node: false,
    entry: \`\${__dirname}/src/index.${ext}\`,
    output: {
      filename: 'index.js',
      path: \`\${__dirname}/dist\`,
      ${dest == DestType.CJS_LIB ? "libraryTarget: 'commonjs2'" : ''}
    }
  };`;

  await withMockedFixture(async (ctx) => {
    if (!ctx.testResult) throw new Error('must use webpack-test fixture');

    debug('(expecting stderr to be "")');
    expect(ctx.testResult.stderr).toBeEmpty();

    debug('(expecting stdout to be "working")');
    expect(ctx.testResult.stdout).toBe('working');

    debug('(expecting exit code to be 0)');
    expect(ctx.testResult.code).toBe(0);
  });

  delete fixtureOptions.initialFileContents[indexPath];
};

beforeAll(async () => {
  if ((await run('test', ['-e', pkgMainPath])).code != 0) {
    debug(`unable to find main distributable: ${pkgMainPath}`);
    throw new Error('must build distributables first (try `npm run build-dist`)');
  }
});

it('can be bundled as CJS source into CJS app by webpack', async () => {
  expect.hasAssertions();
  await runTest({ source: SourceType.CJS, dest: DestType.CJS });
});

it('can be bundled as CJS source into CJS library by webpack', async () => {
  expect.hasAssertions();
  await runTest({ source: SourceType.CJS, dest: DestType.CJS_LIB });
});

it('can be bundled as ESM source into CJS app by webpack', async () => {
  expect.hasAssertions();
  await runTest({ source: SourceType.ESM, dest: DestType.CJS });
});

it('can be bundled as ESM source into CJS library by webpack', async () => {
  expect.hasAssertions();
  await runTest({ source: SourceType.ESM, dest: DestType.CJS_LIB });
});
