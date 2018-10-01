const Register = require('../../plugins/prometheus').register;

const metrics = (req, res) => {
  res.set('Content-Type', Register.contentType);
  res.end(Register.metrics());
};

module.exports = metrics;
