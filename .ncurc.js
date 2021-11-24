// * https://www.npmjs.com/package/npm-check-updates#configuration-files

module.exports = {
  reject: [
    // ? We're going to stick with the CJS version until Jest can handle ESM
    'execa'
  ]
};
