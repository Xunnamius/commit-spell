# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][83]; this project adheres to
[Semantic Versioning][84].

### [2.1.3][85] (2021-08-29)

#### ⚙️ Build system

- **license:** switch to MIT license ([1b9c5f5][86])

### [2.1.2][1] (2021-08-26)

#### 🪄 Fixes

- Scope-root now splits commit-scope on "." ([7f9f4cd][2])

### [2.1.1][3] (2021-08-05)

#### 🪄 Fixes

- Scope-root handles first/second directories, index files as described
  ([5854d08][4])

## [2.1.0][5] (2021-07-31)

#### ✨ Features

- **src:** add --no-verify support ([9e1e803][6])
- **src:** add --scope-root scope option support ([19512db][7])
- **src:** add exclamation-colon support for breaking changes ([4338570][8])

#### 🪄 Fixes

- Update usage for latest yargs ([f9c0393][9])

#### ⚙️ Build system

- **.github/workflows:** remove old workflows ([0f62a7a][10])
- **babel.config.js:** fix add-import-extension surprise breaking change
  ([68a8197][11])
- **webpack.config.js:** show most critical dependency warnings in webpack
  ([6f5f082][12])

### [2.0.5][13] (2021-06-27)

#### ⚙️ Build system

- Switch to @xunnamius/conventional-changelog-projector shared config
  ([2fad2b6][14])
- **package.json:** security updates ([7b91553][15])

### [2.0.4][16] (2021-03-14)

#### ⚙️ Build system

- **deps:** bump simple-git from 2.36.1 to 2.36.2 ([c34d4b5][17])

#### 🔥 Reverted

- _"debug(build-test-deploy.yml): workaround for GH API token issue"_
  ([bf9e348][18])

### [2.0.3][19] (2021-03-08)

#### ⚙️ Build system

- **deps:** bump simple-git from 2.36.0 to 2.36.1 ([0c4897b][20])

### [2.0.2][21] (2021-03-04)

#### ⚙️ Build system

- **deps:** bump simple-git from 2.35.2 to 2.36.0 ([9d3cb79][22])

### [2.0.1][23] (2021-02-24)

#### ⚙️ Build system

- **deps:** bump simple-git from 2.35.1 to 2.35.2 ([90c7837][24])

## [2.0.0][25] (2021-02-24)

### 💥 BREAKING CHANGES 💥

- **_index.ts_:** **attempting to add a path that is already staged will now**
  result in an error unless --force is used. This is to prevent clobbering the
  git index accidentally after running operations like `git add -p`

#### ✨ Features

- **index.ts:** add pre-add check to prevent clobbering the index
  ([93097b4][26]) <sup>closes [#17][27]</sup>

#### ⚙️ Build system

- **integration-client.test.ts:** add integration test for new behavior
  ([d50fcdb][28])
- **integration-client.test.ts:** use the force ([7b9686d][29])
- **unit-index.test.ts:** 100% unit test coverage ([e5d6dcd][30])
- **unit-index.test.ts:** fix bug in test fixture ([d06de98][31])
- **unit-index.test.ts:** make tests consistent with new functionality
  ([072d37f][32])

### [1.1.9][33] (2021-02-23)

#### 🪄 Fixes

- **integration-client.test.ts:** add force:true to del operation
  ([6b698d0][34])
- Import fixes from cli lens ([27901cd][35])

#### ⚙️ Build system

- **package.json:** bump jest timeout to 1 minute ([4c37f00][36])
- **package.json:** update dependencies ([8f59af8][37])
- Rename env-expect to expect-env ([8cdeda3][38])

### [1.1.8][39] (2021-02-11)

#### ⚙️ Build system

- Test-integration-node-cli => test-integration-client ([ae836eb][40])

### [1.1.7][41] (2021-02-11)

#### ⚙️ Build system

- **package.json:** update to proper forked dependencies ([25667ac][42])

### [1.1.6][43] (2021-02-10)

#### ⚙️ Build system

- **webpack.config.js:** normalize webpack configuration across repos
  ([a4e209c][44])
- **webpack.config.js:** remove ES6 syntax from JS file ([db76562][45])

### [1.1.5][46] (2021-02-10)

#### ⚙️ Build system

- **package.json:** update dependencies ([eb1dba9][47])

### [1.1.4][48] (2021-02-08)

#### ⚙️ Build system

- **deps:** bump simple-git from 2.32.0 to 2.34.2 ([6c4feeb][49])

### [1.1.3][50] (2021-02-05)

#### ⚙️ Build system

- **deps:** bump simple-git from 2.31.0 to 2.32.0 ([870bbc2][51])

### [1.1.2][52] (2021-02-04)

#### 🪄 Fixes

- Ensure derived scopes are lowercased ([3ec4273][53])

#### ⚙️ Build system

- **package.json:** update deps ([41cf8f7][54])

### [1.1.1][55] (2021-01-31)

#### 🪄 Fixes

- **git-lib.ts:** fix bug where incorrect staged paths were returned
  ([228dd5d][56])
- Better error message handling and testing ([e3c34c0][57])

#### ⚙️ Build system

- **webpack.config.js:** externalize json imports ([3c8f855][58])

## [1.1.0][59] (2021-01-30)

#### ✨ Features

- Update to new internal implementations; fix several bugs ([d2394e5][60])

#### ⚙️ Build system

- **babel.config.js:** update to transform-default-named-imports plugin
  ([6414981][61])

### [1.0.6][62] (2021-01-29)

#### 🪄 Fixes

- **index.ts:** ensure yargs parses arguments before cwd check ([063ece4][63])

### [1.0.5][64] (2021-01-29)

#### 🪄 Fixes

- **post-release-check.yml:** use correct job name ([6b5020b][65])

### [1.0.4][66] (2021-01-29)

#### 🪄 Fixes

- **index.ts:** add more helpful error messages ([76e58c2][67])
- **post-release-check.yml:** ensure check-compat depends on sleeper job
  ([22592a4][68])

### [1.0.3][69] (2021-01-29)

#### ⚙️ Build system

- **post-release-check.yml:** add five minute wait for npm updates
  ([ec7083e][70])

### [1.0.2][71] (2021-01-29)

#### 🪄 Fixes

- **package.json:** fix dependency classifications ([8835260][72])

#### ⚙️ Build system

- **post-release-check.yml:** ensure packages are downloaded w/ --production
  ([1562bbc][73])

### [1.0.1][74] (2021-01-29)

#### ⚙️ Build system

- **post-release-check.yml:** run executables as part of check ([6151b24][75])

## [1.0.0][76] (2021-01-29)

#### ✨ Features

- Initial commit ([1e08a88][77])
- Upgrade to semantic-release-based pipeline ([3074894][78])

#### ⚙️ Build system

- **build-test-deploy.yml:** drop support for webpack 4 ([66d531e][79])
- **cleanup.yml:** fix bug for new package repos ([0792f9a][80])
- **integration-node-cli.test.ts:** add proper git config ([3947d23][81])
- **package.json:** add @types/yargs explicitly ([1183c65][82])

[1]: https://github.com/Xunnamius/git-add-then-commit/compare/v2.1.1...v2.1.2
[2]:
  https://github.com/Xunnamius/git-add-then-commit/commit/7f9f4cd464771ef52cc8319b976017abbee486eb
[3]: https://github.com/Xunnamius/git-add-then-commit/compare/v2.1.0...v2.1.1
[4]:
  https://github.com/Xunnamius/git-add-then-commit/commit/5854d0840defbae8c4a6a6e00a5634103ee92c32
[5]: https://github.com/Xunnamius/git-add-then-commit/compare/v2.0.5...v2.1.0
[6]:
  https://github.com/Xunnamius/git-add-then-commit/commit/9e1e803087757de27489dd091eb3e70f26835a62
[7]:
  https://github.com/Xunnamius/git-add-then-commit/commit/19512db70b577ae9ee03a3eddf1e59d891d30aee
[8]:
  https://github.com/Xunnamius/git-add-then-commit/commit/43385707664ce8c3fb692b994a75a0395f07b737
[9]:
  https://github.com/Xunnamius/git-add-then-commit/commit/f9c039385a4089e1ecee87685f53923bab89a97b
[10]:
  https://github.com/Xunnamius/git-add-then-commit/commit/0f62a7a04ac3efaf594e06c6f9de17854f5513f7
[11]:
  https://github.com/Xunnamius/git-add-then-commit/commit/68a8197a55efa97bdfe449bc5a20a7ca04c12fa3
[12]:
  https://github.com/Xunnamius/git-add-then-commit/commit/6f5f082b40801cb85567d8f7eed3babf1da81395
[13]: https://github.com/Xunnamius/git-add-then-commit/compare/v2.0.4...v2.0.5
[14]:
  https://github.com/Xunnamius/git-add-then-commit/commit/2fad2b691e972c517ec1a2c0b7b969314483f658
[15]:
  https://github.com/Xunnamius/git-add-then-commit/commit/7b91553f5b94e7e8b337579c0d256b3f3fd6557f
[16]: https://github.com/Xunnamius/git-add-then-commit/compare/v2.0.3...v2.0.4
[17]:
  https://github.com/Xunnamius/git-add-then-commit/commit/c34d4b550e24d37552295c68f1a99d7e640e9238
[18]:
  https://github.com/Xunnamius/git-add-then-commit/commit/bf9e3483a2b5e5aeed64185ed7e00c60490e8e10
[19]: https://github.com/Xunnamius/git-add-then-commit/compare/v2.0.2...v2.0.3
[20]:
  https://github.com/Xunnamius/git-add-then-commit/commit/0c4897bdc94bc8370e21c1f24fdc0243d36f561b
[21]: https://github.com/Xunnamius/git-add-then-commit/compare/v2.0.1...v2.0.2
[22]:
  https://github.com/Xunnamius/git-add-then-commit/commit/9d3cb79c0124c5f2909bae0b88016e9980e73702
[23]: https://github.com/Xunnamius/git-add-then-commit/compare/v2.0.0...v2.0.1
[24]:
  https://github.com/Xunnamius/git-add-then-commit/commit/90c7837bae66250b0d1807316536a4f787a68d47
[25]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.9...v2.0.0
[26]:
  https://github.com/Xunnamius/git-add-then-commit/commit/93097b45f02ad3112b891a8a8d6b06327d31e4a3
[27]: https://github.com/Xunnamius/git-add-then-commit/issues/17
[28]:
  https://github.com/Xunnamius/git-add-then-commit/commit/d50fcdbddf6cefba9b3b1bd488065aa1dbcf48ff
[29]:
  https://github.com/Xunnamius/git-add-then-commit/commit/7b9686df8fe732d007b02497071a5b5c3fb057dd
[30]:
  https://github.com/Xunnamius/git-add-then-commit/commit/e5d6dcdf56869382db0cabd9fd00abb841e0cc0c
[31]:
  https://github.com/Xunnamius/git-add-then-commit/commit/d06de989ac44343a27c5b5e4a8cdf39be16ee96b
[32]:
  https://github.com/Xunnamius/git-add-then-commit/commit/072d37f832b751c4a13a90dc2ba9117a2c51e242
[33]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.8...v1.1.9
[34]:
  https://github.com/Xunnamius/git-add-then-commit/commit/6b698d02e6eaf71d3d3f61935763da0d97ebb065
[35]:
  https://github.com/Xunnamius/git-add-then-commit/commit/27901cdb658a7077638445c7a35bb29aec7d5f0a
[36]:
  https://github.com/Xunnamius/git-add-then-commit/commit/4c37f00927add15ee8c41f7342639bc84bf09bd0
[37]:
  https://github.com/Xunnamius/git-add-then-commit/commit/8f59af828f4fdbcdf7e53bab479631fdbfbd123b
[38]:
  https://github.com/Xunnamius/git-add-then-commit/commit/8cdeda3d460c41701895fc733b01382d77453d12
[39]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.7...v1.1.8
[40]:
  https://github.com/Xunnamius/git-add-then-commit/commit/ae836eb4ab2b88700e0f22deb880049d779e79f4
[41]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.6...v1.1.7
[42]:
  https://github.com/Xunnamius/git-add-then-commit/commit/25667ac53116bddcfd22ca9befef34078148a9f6
[43]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.5...v1.1.6
[44]:
  https://github.com/Xunnamius/git-add-then-commit/commit/a4e209c1093b0eb07bbe82e7d3088fe74d55ff86
[45]:
  https://github.com/Xunnamius/git-add-then-commit/commit/db76562fac7f5db3dede61ffc223952bc8110f5f
[46]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.4...v1.1.5
[47]:
  https://github.com/Xunnamius/git-add-then-commit/commit/eb1dba93a66257fa06956d1f754d67f07a7267e3
[48]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.3...v1.1.4
[49]:
  https://github.com/Xunnamius/git-add-then-commit/commit/6c4feeb715371890e3ef6b6f16c912c025470290
[50]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.2...v1.1.3
[51]:
  https://github.com/Xunnamius/git-add-then-commit/commit/870bbc20d74901bacba2b381e03357f5c1237ddf
[52]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.1...v1.1.2
[53]:
  https://github.com/Xunnamius/git-add-then-commit/commit/3ec4273115289ab48b38b35a214d0e23b507a13e
[54]:
  https://github.com/Xunnamius/git-add-then-commit/commit/41cf8f7ec2bee7be9bdfa9d483678600daf2a27d
[55]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.1.0...v1.1.1
[56]:
  https://github.com/Xunnamius/git-add-then-commit/commit/228dd5dac079866cfae39baa1581c918bf29cfb1
[57]:
  https://github.com/Xunnamius/git-add-then-commit/commit/e3c34c05143a7fae1f1fd9d3f509b002f35b5886
[58]:
  https://github.com/Xunnamius/git-add-then-commit/commit/3c8f8558c445e1ebbb5c9ca36cb83fc74df46895
[59]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.0.6...v1.1.0
[60]:
  https://github.com/Xunnamius/git-add-then-commit/commit/d2394e515ab103d82f02cabb7e472ce42fcd299c
[61]:
  https://github.com/Xunnamius/git-add-then-commit/commit/6414981f96d88bee2230725a3e6a0c98dd84da77
[62]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.0.5...v1.0.6
[63]:
  https://github.com/Xunnamius/git-add-then-commit/commit/063ece4205774b2b5a768cf34223dbd8ead72701
[64]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.0.4...v1.0.5
[65]:
  https://github.com/Xunnamius/git-add-then-commit/commit/6b5020b7607758fce2f916bba2de5f5f05e416aa
[66]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.0.3...v1.0.4
[67]:
  https://github.com/Xunnamius/git-add-then-commit/commit/76e58c25acd362cedb3d7742dbdd248c6026c952
[68]:
  https://github.com/Xunnamius/git-add-then-commit/commit/22592a4742648394dc15e28d8767b376a9bbacba
[69]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.0.2...v1.0.3
[70]:
  https://github.com/Xunnamius/git-add-then-commit/commit/ec7083eab998634a7d85da2d669e332ceaa0c0c2
[71]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.0.1...v1.0.2
[72]:
  https://github.com/Xunnamius/git-add-then-commit/commit/88352606b5b11b50da45b91eb521abbe0619d6ba
[73]:
  https://github.com/Xunnamius/git-add-then-commit/commit/1562bbc9cf6d921907128ea61988d3a19b1d853f
[74]: https://github.com/Xunnamius/git-add-then-commit/compare/v1.0.0...v1.0.1
[75]:
  https://github.com/Xunnamius/git-add-then-commit/commit/6151b2452394e6c8bd9dee9c0c53706edeb6ce77
[76]:
  https://github.com/Xunnamius/git-add-then-commit/compare/1e08a889343fac542b4196a2d0b77fc7feb26a50...v1.0.0
[77]:
  https://github.com/Xunnamius/git-add-then-commit/commit/1e08a889343fac542b4196a2d0b77fc7feb26a50
[78]:
  https://github.com/Xunnamius/git-add-then-commit/commit/307489496f94132a1d074374e6dc4d1bc57b0df6
[79]:
  https://github.com/Xunnamius/git-add-then-commit/commit/66d531e72db3cc2978fef77d643bd9c000101728
[80]:
  https://github.com/Xunnamius/git-add-then-commit/commit/0792f9a4e62cf816840fc67a53848bdc8e97a9c3
[81]:
  https://github.com/Xunnamius/git-add-then-commit/commit/3947d237b2562b8a78b06a98bc6e6d417356dc20
[82]:
  https://github.com/Xunnamius/git-add-then-commit/commit/1183c65a74fed20b2a7e71cbbd5f8577f7ec8b27
[83]: https://conventionalcommits.org
[84]: https://semver.org
[85]: https://github.com/Xunnamius/git-add-then-commit/compare/v2.1.2...v2.1.3
[86]:
  https://github.com/Xunnamius/git-add-then-commit/commit/1b9c5f575a9f16aef6a64dcb12be8deafc642d44
