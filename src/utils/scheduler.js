const cron = require('node-cron');
const DEFAULT_INTERVAL = '* * * * *';

function start(task, interval = DEFAULT_INTERVAL) {
  if (task && typeof task === 'function') {
    cron.schedule(interval, task);
  }
}

module.exports = {
  start
};
