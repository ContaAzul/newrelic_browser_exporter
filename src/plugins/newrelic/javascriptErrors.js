const GaugeChart = require('../prometheus/charts/gauge');
const browser = require('./api-request');
let JSErrorsGauge;

const start = () => {
  JSErrorsGauge = new GaugeChart({
    name: 'JS_Errors',
    help: 'return a percentage of pageviews with javascript errors',
  });
  return JSErrorsGauge;
};

const scheduleTask = (APP_ID, API_KEY) => (() => {
  const names = 'EndUser/errors';
  const values = '';
  browser.collectData(APP_ID, API_KEY, names, values, callback);
});

function callback(error, response, body) {
  const percentage = JSON.parse(body)
    .metric_data.metrics[0]
    .timeslices[0]
    .values
    .error_percentage;

  JSErrorsGauge.setValues(percentage);
  return percentage;
}

module.exports = {
  start,
  scheduleTask
};
