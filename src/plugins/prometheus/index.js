const client = require('prom-client');
const scheduler = require('../../utils/scheduler');

const start = () => {
  scheduler(() => {
    client.collectDefaultMetrics();
  });
};

module.exports = {
  start,
  register: client.register,
  charts: {
    gauge: client.Gauge
  }
};
