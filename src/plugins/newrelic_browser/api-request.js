const request = require('request');
const collectData = (app_id, api_key, names, values, callback) => {
  const myDate = new Date();
  const MS_PER_MINUTE = 60000;
  const myStartDate = new Date(myDate - MS_PER_MINUTE);
  const API_DOMAIN = 'https://api.newrelic.com';
  const API_VERSION = 'v2';
  const REQUEST_URL =
    `${API_DOMAIN}/${API_VERSION}/applications/${app_id}/metrics/data.json`;
  const options = {
    url: REQUEST_URL,
    headers: {
      'X-Api-Key': `${api_key}`
    },
    form: {
      from: myStartDate.toJSON().split('.')[0],
      to: myDate.toJSON().split('.')[0],
      period: 60
    }
  };
  names && (options.form.names = names);
  values && (options.form.values = values);

  request.post(options, callback);
}

module.exports = {
  collectData
};
