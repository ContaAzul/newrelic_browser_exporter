# **How to contribute to newrelic browser exporter**

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

**src/app/routes/metrics.js** - Will be executed when the /metrics route is accessed. This code will start to collect data from newRelic plugin and output a string to [prometheus consuming](https://github.com/siimon/prom-client#register).

**src/app/router.js** - Initialize /metrics route.

**src/app/server.js** - Contains the code to start application and configure application routes.

**src/index.js** - Start server methods.

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

**newrelic_browser/** - Contains the code that will communicate with the API([api-request.js](https://github.com/ContaAzul/newrelic_browser_exporter/blob/master/src/plugins/newrelic_browser/api-request.js)) and the code that will initialize the prometheus chart and execute the callback after call to the API.

**newrelic_browser/javascriptErrorsPercent/** - Contains the code that will create the javascript errors percent chart according prometheus model and the code that will be executed after the api response and set this data in chart.

**newrelic_browser/api-requets** - Contains the code that will setup data before call newrelic api. API will return a unique value corresponding to the value of that data in the last minute.

**prometheus/charts** - Contains the metric types used to create new chart. To know which metrics are supported by prometheus, see [metric types](https://prometheus.io/docs/concepts/metric_types/).


## **How to set up a new metric**

Create a folder inside newrelic_browser. This folder shold be a file with a public method and callback method. The public method(In javascriptErrorsPercent this method is called collectData) will be initialize the chart if is the first call, like this:

```js
const GaugeChart = require('../../prometheus/charts/gauge');
let JSErrorsGauge;

const collectData = () => new Promise((resolve, reject) => {
  if (!JSErrorsGauge) {
    JSErrorsGauge = new GaugeChart({
      name: 'newrelic_browser_javascript_errors_percent',
      help: 'return a percentage of pageviews with javascript errors',
    });
  }

  //... (hidden code)
}

module.exports = {
  collectData,
};
```
Please read [prometheus best practices](https://prometheus.io/docs/practices/naming/) to name your chart configurations.

After create the chart configuration you will need to set up the name and the value to retrieve specific metrics from this data.

```js
//...
const collectData = () => new Promise((resolve, reject) => {
  //...

  const names = 'EndUser/errors';
  const values = 'error_percentage';

  //...
}
//...
```

Now you can call newrelic api passing these arguments and the callback that will be executed after api response and will set the metric value.
Code to call api:

```js
//...
const collectData = () => new Promise((resolve, reject) => {
  //...

  browser
    .collectData(names, values)
    .then((response) => {
      onSuccess(response, resolve);
    })
    .catch(reject);

}
//...
```
Callback method should set the metric collected from api request into chart(I this example, the chart is JSErrorsGauge):

```js
//...
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
Please, see prometheus [base units](https://prometheus.io/docs/practices/naming/#base-units) before set value in chart.
After set value, promise is resolved.

## **Tests**
We use [jest](https://jestjs.io/) to write and run tests.
In **most cases** you will need to write test scenarios for the code you are developing.

Run tests using ``` jest``` or ```npm test``` command. To see coverage, run ```jest --coverage```.


