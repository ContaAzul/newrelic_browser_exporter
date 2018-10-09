const scheduler = require('../../utils/scheduler');
const jsErrors = require('./javascriptErrorsPercent');
const start = (APP_ID, API_KEY) => {
  jsErrors.start();
  scheduler.start(jsErrors.scheduleTask(APP_ID, API_KEY));
}

module.exports = {
  start
};
