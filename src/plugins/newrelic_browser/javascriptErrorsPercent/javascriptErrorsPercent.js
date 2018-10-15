const GaugeChart = require('../../prometheus/charts/gauge');
const browser = require('../api-request');
let JSErrorsGauge;

const collectData = () => {
  return new Promise((resolve, reject) => {
    if (!JSErrorsGauge) {
      JSErrorsGauge = new GaugeChart({
        name: 'newrelic_browser_javascript_errors_percent',
        help: 'return a percentage of pageviews with javascript errors',
      });
    }

    const names = 'EndUser/errors';
    const values = '';
    browser
      .collectData(names, values)
      .then(function (response) {
        onSuccess(response, resolve);
      })
      .catch(reject);
  });
};

function onSuccess(response, resolve) {
  const percentage = JSON.parse(response)
    .metric_data.metrics[0]
    .timeslices[0]
    .values
    .error_percentage / 100;

  JSErrorsGauge.setValues(Number(percentage.toFixed(8)));
  resolve();
}

module.exports = {
  collectData
};
