const request = require('request-promise');
const apiRequest = require('./api-request');

describe('api request', () => {
  test('should call request', async () => {
    request.post = jest
      .fn()
      .mockResolvedValue();

    process.env.APP_ID = 555666;
    process.env.API_KEY = '111222';
    const HEADERS = {
      'X-Api-Key': process.env.API_KEY,
    };
    const REQUEST_URL = `https://api.newrelic.com/v2/applications/${process.env.APP_ID}/metrics/data.json`;
    const names = 'newrelic_browser_javascript_errors_percent';
    const values = 'EndUser';
    await apiRequest.collectData(names, values);
    expect(request.post.mock.calls.length).toBe(1);
    expect(request.post.mock.calls[0][0].url).toBe(REQUEST_URL);
    expect(request.post.mock.calls[0][0].headers).toEqual(HEADERS);
    expect(request.post.mock.calls[0][0].form.names).toEqual(names);
    expect(request.post.mock.calls[0][0].form.values).toEqual(values);
    expect(request.post.mock.calls[0][0].form.period).toEqual(60);
  });
});
