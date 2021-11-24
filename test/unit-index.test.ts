import { configureProgram, GIT_COMMITMSG_PATH } from 'universe/index';
import { asMockedFunction, withMockedArgv, withMockedOutput } from 'testverse/setup';
import { promises } from 'fs';
import { toss } from 'toss-expression';
import spellcheck from 'spellchecker';

import type { Context } from '../src/index';

const mockedReadFile = asMockedFunction(promises.readFile);
const checkSpelling = asMockedFunction(spellcheck.checkSpelling);
const getCorrectionsForMisspelling = asMockedFunction(
  spellcheck.getCorrectionsForMisspelling
);

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

jest.mock('spellchecker', () => ({
  checkSpelling: jest.fn(),
  getCorrectionsForMisspelling: jest.fn()
}));

const getProgram = () => {
  const ctx = configureProgram();
  ctx.program.exitProcess(false);
  return ctx;
};

const runProgram = async (argv: string[], ctx?: Context) => {
  return (ctx || getProgram()).parse(argv);
};

// ? Captures output and mocks argv
const withMocks = async (
  fn: Parameters<typeof withMockedOutput>[0],
  argv: string[] = [],
  options?: Parameters<typeof withMockedArgv>[2]
) => withMockedArgv(() => withMockedOutput(fn), argv, options);

describe('::configureProgram', () => {
  it(`spellchecks ${GIT_COMMITMSG_PATH}`, async () => {
    expect.hasAssertions();

    mockedReadFile.mockImplementation(async (path) => {
      return path == GIT_COMMITMSG_PATH
        ? 'no typos here!'
        : toss(new Error(`${path} does not exist`));
    });

    await withMocks(async ({ warnSpy }) => {
      await expect(runProgram([])).resolves.not.toBeUndefined();
      expect(mockedReadFile).toBeCalledWith(GIT_COMMITMSG_PATH);
      expect(warnSpy).not.toBeCalled();
    });

    mockedReadFile.mockImplementation(async (path) => {
      return path == GIT_COMMITMSG_PATH
        ? 'notyposhere!'
        : toss(new Error(`${path} does not exist`));
    });

    await withMocks(async ({ warnSpy }) => {
      await expect(runProgram([])).resolves.not.toBeUndefined();
      expect(mockedReadFile).toBeCalledWith(GIT_COMMITMSG_PATH);
      expect(warnSpy).toBeCalledWith(expect.stringContaining('notyposhere'));
    });
  });

  it(`noop if ${GIT_COMMITMSG_PATH} is empty`, async () => {
    expect.hasAssertions();

    mockedReadFile.mockImplementation(async (path) => {
      return path == GIT_COMMITMSG_PATH ? '' : toss(new Error(`${path} does not exist`));
    });

    await withMocks(async ({ warnSpy }) => {
      await expect(runProgram([])).resolves.not.toBeUndefined();
      expect(mockedReadFile).toBeCalledWith(GIT_COMMITMSG_PATH);
      expect(warnSpy).not.toBeCalled();
    });
  });

  it(`noop if ${GIT_COMMITMSG_PATH} is does not exist`, async () => {
    expect.hasAssertions();

    mockedReadFile.mockImplementation(async (path) =>
      toss(new Error(`${path} does not exist`))
    );

    await withMocks(async ({ warnSpy }) => {
      await expect(runProgram([])).resolves.not.toBeUndefined();
      expect(mockedReadFile).toBeCalledWith(GIT_COMMITMSG_PATH);
      expect(warnSpy).not.toBeCalled();
    });
  });

  it('respects .spellcheckignore (cwd)', async () => {
    expect.hasAssertions();

    mockedReadFile.mockImplementation(async (path) => {
      return path == GIT_COMMITMSG_PATH
        ? 'notyposhere!'
        : path == toss(new Error(`${path} does not exist`));
    });

    await withMocks(async ({ warnSpy }) => {
      await expect(runProgram([])).resolves.not.toBeUndefined();
      expect(mockedReadFile).toBeCalledWith(GIT_COMMITMSG_PATH);
      expect(warnSpy).not.toBeCalled();
    });
  });

  it('respects .spellcheckignore (user)', async () => {
    expect.hasAssertions();
  });

  it('respects package names found in package.json', async () => {
    expect.hasAssertions();
  });

  it('respects cSpell key in VSCode settings.json (cwd)', async () => {
    expect.hasAssertions();
  });

  it('respects cSpell key in VSCode settings.json (user)', async () => {
    expect.hasAssertions();
  });

  it('respects words from repo commit history', async () => {
    expect.hasAssertions();
  });

  it('does not error when no whitelists or commit history are available', async () => {
    expect.hasAssertions();
  });

  it('collates word data from all whitelists, commit history concurrently', async () => {
    expect.hasAssertions();
  });
});
