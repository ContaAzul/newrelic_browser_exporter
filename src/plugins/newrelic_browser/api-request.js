var rp = require('request-promise');
const config = require('../../app/config');

const collectData = (names, values) => {
  return new Promise((resolve, reject) => {
    const myDate = new Date();
    const MS_PER_MINUTE = 60000;
    const myStartDate = new Date(myDate - MS_PER_MINUTE);
    const API_DOMAIN = 'https://api.newrelic.com';
    const API_VERSION = 'v2';
    const REQUEST_URL =
      `${API_DOMAIN}/${API_VERSION}/applications/${config.APP_ID}/metrics/data.json`;
    const options = {
      url: REQUEST_URL,
      headers: {
        'X-Api-Key': `${config.API_KEY}`
      },
      form: {
        from: myStartDate.toJSON().split('.')[0],
        to: myDate.toJSON().split('.')[0],
        period: 60
      }
    };
    names && (options.form.names = names);
    values && (options.form.values = values);

    rp.post(options).then((data) => {
      resolve(data);
    });
  });
};

module.exports = {
  collectData
};
