const Register = require('../../plugins/prometheus').register;
const { newRelicPlugin } = require('../../plugins');

const metrics = (req, res) => {
  res.set('Content-Type', Register.contentType);
  newRelicPlugin.collectData().then(() => {
    res.end(Register.metrics());
  });
};

module.exports = metrics;
