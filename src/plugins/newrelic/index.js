const scheduler = require('../../utils/scheduler');
const jsErrors = require('./javascriptErrors');

const start = (APP_ID, API_KEY) => {
  jsErrors.start();
  scheduler(jsErrors.scheduleTask(APP_ID, API_KEY));
}

module.exports = {
  start
};
