const jsErrors = require('./javascriptErrorsPercent/javascriptErrorsPercent');

const collectData = () => Promise.all([jsErrors.collectData()]);

module.exports = {
  collectData,
};
