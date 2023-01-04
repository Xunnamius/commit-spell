<!-- prettier-ignore-start -->

<!-- badges-start -->

[![Black Lives Matter!][badge-blm]][link-blm]
[![Maintenance status][badge-maintenance]][link-repo]
[![Last commit timestamp][badge-last-commit]][link-repo]
[![Open issues][badge-issues]][link-issues]
[![Pull requests][badge-pulls]][link-pulls]
[![Codecov][badge-codecov]][link-codecov]
[![Source license][badge-license]][link-license]
[![Tree shaking support][badge-tree-shaking]][link-bundlephobia]
[![Compressed package size][badge-size]][link-bundlephobia]
[![NPM version][badge-npm]][link-npm]
[![Uses Semantic Release!][badge-semantic-release]][link-semantic-release]

<!-- badges-end -->

<!-- prettier-ignore-end -->

# commit-spell

`commit-spell` unites Atom's [multi-platform spellchecker][2] (bindings for
Hunspell, Windows Spell Check API, and NSSpellChecker), VSCode's [Code Spell
Checker][3] dictionaries, custom local and user dictionaries, and words from
your repository's commit history to spellcheck your commit messages as you craft
them.

## Install

```bash
npm install --save-dev commit-spell
```

<details><summary>[additional details]</summary>

> Note: **you probably don't need to read through this!** This information is
> primarily useful for those attempting to bundle this package or for people who
> have an opinion on ESM versus CJS.

This is a [dual CJS2/ES module][dual-module] package. That means this package
exposes both CJS2 and ESM entry points.

Loading this package via `require(...)` will cause Node and Webpack to use the
[CJS2 bundle][cjs2] entry point, disable [tree shaking][tree-shaking] in Webpack
4, and lead to larger bundles in Webpack 5. Alternatively, loading this package
via `import { ... } from ...` or `import(...)` will cause Node to use the ESM
entry point in [versions that support it][node-esm-support], as will Webpack.
Using the `import` syntax is the modern, preferred choice.

For backwards compatibility with Webpack 4 (_compat with Webpack 4 is not
guaranteed!_) and Node versions < 14, [`package.json`][package-json] retains the
[`module`][module-key] key, which points to the ESM entry point, and the
[`main`][exports-main-key] key, which points to the CJS2 entry point explicitly
(using the .js file extension). For Webpack 5 and Node versions >= 14,
[`package.json`][package-json] includes the [`exports`][exports-main-key] key,
which points to both entry points explicitly.

Though [`package.json`][package-json] includes
[`{ "type": "commonjs"}`][local-pkg], note that the ESM entry points are ES
module (`.mjs`) files. [`package.json`][package-json] also includes the
[`sideEffects`][side-effects-key] key, which is `false` for [optimal tree
shaking][tree-shaking], and the `types` key, which points to a TypeScript
declarations file.

Additionally, this package does not maintain shared state and so does not
exhibit the [dual package hazard][hazard].

</details>

## Usage

> [`git`][4] is required to run `commit-spell`.

`commit-spell` can be run by hand—where the current working directory is the
root of your repository—or as part of a [commit-msg git hook][5]:

```bash
npx commit-spell
```

When run, it looks for a `<current working directory>/.git/COMMIT_EDITMSG` file
and checks its (utf-8) contents for spelling errors. In addition to the
platform-specific spellchecker and words in the [text-extensions][6] dictionary,
a word can be whitelisted by adding it to one of the following:

- `<current working directory>/.spellcheckignore` or
  `<user home directory>/.config/_spellcheckignore` on a new line
- `<current working directory>/package.json` as a key under _dependencies_,
  _devDependencies_, _peerDependencies_, or _scripts_
- `<current working directory>/.vscode/settings.json` or
  `<user home directory>/.config/Code/User/settings.json` as an element of
  _cSpell.words_, _cSpell.userWords_, or _cSpell.ignoreWords_
- Any word appearing in the output of `git log --format="%B" HEAD~1`

Additionally, you can use `--help` to get help text output, `--version` to get
the current version, `--silent` to prevent all output, and `--show-all` to show
all potential typos.

### Example

This repository [uses itself to spellcheck its own commits][7] via [husky][8].

### Importing as a Module

This package can be imported and run directly in source without spawning a child
process or calling a CLI. This is useful for, for instance, composing multiple
[yargs][1]-based CLI tools together.

```typescript
import { configureProgram } from 'commit-spell';

const { program, parse } = configureProgram();
// `program` is a yargs instance
// `parse` is an async function that will (eventually) call program.parse(...)
await parse([]);
```

## Documentation

Further documentation can be found under [`docs/`][docs].

### License

[![FOSSA analysis][badge-fossa]][link-fossa]

## Contributing and Support

**[New issues][choose-new-issue] and [pull requests][pr-compare] are always
welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟 this
project][link-repo] to let me know you found it useful! ✊🏿 Thank you!

See [CONTRIBUTING.md][contributing] and [SUPPORT.md][support] for more
information.

[badge-blm]: https://xunn.at/badge-blm 'Join the movement!'
[link-blm]: https://xunn.at/donate-blm
[badge-maintenance]:
  https://img.shields.io/maintenance/active/2023
  'Is this package maintained?'
[link-repo]: https://github.com/xunnamius/commit-spell
[badge-last-commit]:
  https://img.shields.io/github/last-commit/xunnamius/commit-spell
  'When was the last commit to the official repo?'
[badge-issues]:
  https://img.shields.io/github/issues/Xunnamius/commit-spell
  'Open issues'
[link-issues]: https://github.com/Xunnamius/commit-spell/issues?q=
[badge-pulls]:
  https://img.shields.io/github/issues-pr/xunnamius/commit-spell
  'Number of open pull requests'
[link-pulls]: https://github.com/xunnamius/commit-spell/pulls
[badge-codecov]:
  https://codecov.io/gh/Xunnamius/commit-spell/branch/main/graph/badge.svg?token=HWRIOBAAPW
  'Is this package well-tested?'
[link-codecov]: https://codecov.io/gh/Xunnamius/commit-spell
[badge-size]: https://badgen.net/bundlephobia/minzip/commit-spell
[badge-tree-shaking]:
  https://badgen.net/bundlephobia/tree-shaking/commit-spell
  'Is this package optimized for Webpack?'
[link-bundlephobia]:
  https://bundlephobia.com/result?p=commit-spell
  'Package size (minified and gzipped)'
[package-json]: package.json
[badge-license]:
  https://img.shields.io/npm/l/commit-spell
  "This package's source license"
[link-license]: https://github.com/Xunnamius/commit-spell/blob/main/LICENSE
[badge-fossa]:
  https://app.fossa.com/api/projects/git%2Bgithub.com%2FXunnamius%2Fcommit-spell.svg?type=large
  "Analysis of this package's license obligations"
[link-fossa]:
  https://app.fossa.com/projects/git%2Bgithub.com%2FXunnamius%2Fcommit-spell
[badge-npm]:
  https://api.ergodark.com/badges/npm-pkg-version/commit-spell
  'Install this package using npm or yarn!'
[link-npm]: https://www.npmjs.com/package/commit-spell
[badge-semantic-release]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
  'This repo practices continuous integration and deployment!'
[link-semantic-release]: https://github.com/semantic-release/semantic-release
[docs]: docs
[choose-new-issue]: https://github.com/Xunnamius/commit-spell/issues/new/choose
[pr-compare]: https://github.com/Xunnamius/commit-spell/compare
[contributing]: CONTRIBUTING.md
[support]: .github/SUPPORT.md
[cjs2]: https://webpack.js.org/configuration/output/#module-definition-systems
[dual-module]:
  https://github.com/nodejs/node/blob/8d8e06a345043bec787e904edc9a2f5c5e9c275f/doc/api/packages.md#dual-commonjses-module-packages
[exports-main-key]:
  https://github.com/nodejs/node/blob/8d8e06a345043bec787e904edc9a2f5c5e9c275f/doc/api/packages.md#package-entry-points
[hazard]:
  https://github.com/nodejs/node/blob/8d8e06a345043bec787e904edc9a2f5c5e9c275f/doc/api/packages.md#dual-package-hazard
[local-pkg]:
  https://github.com/nodejs/node/blob/8d8e06a345043bec787e904edc9a2f5c5e9c275f/doc/api/packages.md#type
[module-key]: https://webpack.js.org/guides/author-libraries/#final-steps
[node-esm-support]:
  https://medium.com/%40nodejs/node-js-version-14-available-now-8170d384567e#2368
[side-effects-key]:
  https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free
[tree-shaking]: https://webpack.js.org/guides/tree-shaking
[1]: https://github.com/yargs/yargs
[2]: https://www.npmjs.com/package/spellchecker
[3]:
  https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
[4]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[5]:
  https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks#_committing_workflow_hooks
[6]: https://www.npmjs.com/package/text-extensions
[7]: ./.husky/commit-msg
[8]: https://www.npmjs.com/package/husky
