const Register = require('../../plugins/prometheus').register;
const newRelicPlugin = require('../../plugins').newRelicPlugin;

const metrics = (req, res) => {
  res.set('Content-Type', Register.contentType);
  newRelicPlugin.collectData().then((response) => {
    res.end(Register.metrics());
  });
};

module.exports = metrics;
