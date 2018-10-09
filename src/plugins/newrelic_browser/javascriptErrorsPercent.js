const GaugeChart = require('../prometheus/charts/gauge');
const browser = require('./api-request');
let JSErrorsGauge;
const start = () => {
  JSErrorsGauge = new GaugeChart({
    name: 'newrelic_browser_javascript_errors_percent',
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
  console.log(body);

  const percentage = JSON.parse(body)
    .metric_data.metrics[0]
    .timeslices[0]
    .values
    .error_percentage / 100;

  JSErrorsGauge.setValues(Number(percentage.toFixed(8)));
  return percentage;
}
module.exports = {
  start,
  scheduleTask
};
