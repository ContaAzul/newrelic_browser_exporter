const jsErrors = require('./javascriptErrorsPercent/javascriptErrorsPercent')

const collectData = function(){
  return Promise.all([jsErrors.collectData()]);
}

module.exports = {
  collectData
};
