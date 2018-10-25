# **How to contribute to newrelic browser exporter**

#### Table of Contents

[Project structure](#project-structure)
  * [application](#application)
  * [plugins](#plugins)

[How to set up a new metric](#How-to-set-up-a-new-metric)

[Tests](#tests)

## **Project structure**

### **application**:
```
─ src/
  ├── app/
  │   ├── routes/
  │   │   └── metrics.js
  │   ├── router.js
  │   └── server.js
  └── index.js
```

**[src/app/routes/metrics.js](https://github.com/ContaAzul/newrelic_browser_exporter/blob/master/src/app/routes/metrics.js)** - It represents the `/metrics` route, which outputs the metrics from `register.metrics()` as a string in a Prometheus like format that can be consumed by a [Prometheus Client](https://github.com/siimon/prom-client#register).

**[src/app/router.js](https://github.com/ContaAzul/newrelic_browser_exporter/blob/master/src/app/router.js)** - It registers all applications routes.

**[src/app/server.js](https://github.com/ContaAzul/newrelic_browser_exporter/blob/master/src/app/server.js)** - Contains the code to start and configure the application.

**[src/index.js](https://github.com/ContaAzul/newrelic_browser_exporter/blob/master/src/index.js)** - It starts the application.

### **plugins**:
```
─ src/
  └── plugins/
      ├── newrelic_browser/
      │   ├── javascriptErrorsPercent/
      │   └── api-request.js
      └── prometheus/
          └── charts/
              ├── default.js
              └──  gauge.js
```

**[newrelic_browser/](https://github.com/ContaAzul/newrelic_browser_exporter/tree/master/src/plugins/newrelic_browser)** - This plugin is responsible for pulling data from New Relic's API([api-request.js](https://github.com/ContaAzul/newrelic_browser_exporter/blob/master/src/plugins/newrelic_browser/api-request.js)) and exporting it as Prometheus charts.

**[prometheus](https://github.com/ContaAzul/newrelic_browser_exporter/tree/master/src/plugins/prometheus)** - Contains the metric types used to create new Prometheus charts and exports the global Prometheus `registry`. To know which metrics are supported by prometheus, see [metric types](https://prometheus.io/docs/concepts/metric_types/).


## **How to set up a new metric**

Create a new folder inside `newrelic_browser` plugin. Inside this folder create a new file that must have a public method called `collectData` which must return a new `Promise`. The public method initializes and returns the chart:

```js
// javascriptErrorsPercent.js
const GaugeChart = require('../../prometheus/charts/gauge');
let JSErrorsGauge;

const collectData = () => new Promise((resolve, reject) => {
  if (!JSErrorsGauge) {
    JSErrorsGauge = new GaugeChart({
      name: 'newrelic_browser_javascript_errors_percent',
      help: 'return a percentage of pageviews with javascript errors',
    });
  }

  ...
}

module.exports = {
  collectData,
};
```

Please read [prometheus best practices](https://prometheus.io/docs/practices/naming/) to name your chart's configurations.

After creating the chart's configuration it is necessary to set up the parameters such as `name` and `value` to retrieve specific metrics from this [New Relic's API](https://rpm.newrelic.com/api/explore/applications/metric_data)

```js
// javascriptErrorsPercent.js
const collectData = () => new Promise((resolve, reject) => {
  ...

  const names = 'EndUser/errors';
  const values = 'error_percentage';

  ...
}
```

Now that all parameters are set up, a request to New Relic's API can be done by calling `browser.collectData()`:

```js
// javascriptErrorsPercent.js
const browser = require('../api-request');

const collectData = () => new Promise((resolve, reject) => {
  //...

  browser
    .collectData(names, values)
    .then(response => {
      onSuccess(response, resolve);
    })
    .catch(reject);

}
//...
```

A callback method should set the metrics collected from New Relic's API into the chart. Please, see prometheus [base units](https://prometheus.io/docs/practices/naming/#base-units) to know how to set values into charts according Prometheus patterns.

```js
// javascriptErrorsPercent.js
function onSuccess(response, resolve) {
  const percentage = JSON.parse(response)
    .metric_data.metrics[0]
    .timeslices[0]
    .values
    .error_percentage / 100;

  JSErrorsGauge.setValues(Number(percentage.toFixed(8)));
  resolve();
}
//...

```

After setting values to the chart and resolving the `Promise`, New Relic's metrics are avaliable as Prometheus metrics in the `/metrics` endpoint.

## **Tests**
Tests are written using [jest](https://jestjs.io/). In **most cases** new test scenarios are necessary for the new developed code.

Run tests using `jest` or `npm test` commands. To see coverage, run `jest --coverage`.
