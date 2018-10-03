describe('api request', () => {

  const apiRequest = require('./api-request');
  const request = require('request');

  beforeEach(()=>{
    request.post = jest.fn();
  })

  test('should call request', () => {
    const APP_ID = 555666;
    const API_KEY = '111222';
    const HEADERS = {
      'X-Api-Key': API_KEY
    }
    const REQUEST_URL = `https://api.newrelic.com/v2/applications/${APP_ID}/metrics/data.json`;
    const names = 'JS_Errors';
    const values = 'EndUser';

    apiRequest.collectData(APP_ID, API_KEY, names, values, 'javascript_errors', ()=>{});

    expect(request.post.mock.calls.length).toBe(1);
    expect(request.post.mock.calls[0][0].url).toBe(REQUEST_URL);
    expect(request.post.mock.calls[0][0].headers).toEqual(HEADERS);
    expect(request.post.mock.calls[0][0].form.names).toEqual(names);
    expect(request.post.mock.calls[0][0].form.values).toEqual(values);
    expect(request.post.mock.calls[0][0].form.period).toEqual(60);
  })
})
