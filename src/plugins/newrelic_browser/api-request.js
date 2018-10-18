const rp = require('request-promise');

const collectData = (names, values) => new Promise((resolve, reject) => {
  const myDate = new Date();
  const MS_PER_MINUTE = 60000;
  const myStartDate = new Date(myDate - MS_PER_MINUTE);
  const API_DOMAIN = 'https://api.newrelic.com';

  const API_VERSION = 'v2';
  const REQUEST_URL = `${API_DOMAIN}/${API_VERSION}/applications/${process.env.APP_ID}/metrics/data.json`;
  const options = {
    url: REQUEST_URL,
    headers: {
      'X-Api-Key': `${process.env.API_KEY}`,
    },
    form: {
      from: myStartDate.toJSON().split('.')[0],
      to: myDate.toJSON().split('.')[0],
      period: 60,
    },
  };

  if (names) {
    options.form.names = names;
  }
  if (values) {
    options.form.values = values;
  }

  rp
    .post(options)
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

module.exports = {
  collectData,
};
