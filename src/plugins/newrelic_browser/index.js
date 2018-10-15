const jsErrors = require('./javascriptErrorsPercent/javascriptErrorsPercent')

const collectData = function(){
  return jsErrors.collectData();
}

module.exports = {
  collectData
};
