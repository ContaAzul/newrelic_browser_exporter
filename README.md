# **newrelic_browser_exporter**
Exports new relic browser metrics data as prometheus metrics.

Expose the following metric:
  - Percentage of pageviews with javascript errors.

## **Building and Running**
You will need [API_KEY](https://docs.newrelic.com/docs/apis/getting-started/intro-apis/understand-new-relic-api-keys) and browser [APP_ID](https://docs.newrelic.com/docs/apis/rest-api-v2/requirements/find-product-id) from new relic account.

### **With docker:**
To run:

```cmd
docker run -p 9595:9595 -e "API_KEY=****" -e "APP_ID=****" caninjas/newrelic_browser_exporter
```

### **From source:**
Clone this repo and go to newrelic_browser_exporter folder:
```cmd
> git clone git@github.com:ContaAzul/newrelic_browser_exporter.git
> cd newrelic_browser_exporter
```

Install dependencies with ```npm install``` command and run with:
```cmd
npm start APP_ID='****' API_KEY='****'
```

Metrics will be exposed in ```localhost:9595/metrics```

Would you like to help? See [contributing](https://github.com/ContaAzul/newrelic_browser_exporter/blob/master/CONTRIBUTING.md).

