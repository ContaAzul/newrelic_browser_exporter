const client = require('prom-client');

module.exports = {
  register: client.register,
  charts: {
    gauge: client.Gauge
  }
};
