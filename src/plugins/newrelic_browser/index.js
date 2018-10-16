const jsErrors = require('./javascriptErrorsPercent/javascriptErrorsPercent')

const collectData = () => {
  return Promise.all([jsErrors.collectData()]);
}

module.exports = {
  collectData
};
