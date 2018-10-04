describe('api request', () => {
  const scheduler = require('../../utils/scheduler');
  const jsErrors = require('./javascriptErrors');
  const newRelicMetrics = require('./index.js');
  beforeEach(() => {
    jsErrors.start = jest.fn();
    jsErrors.scheduleTask = jest.fn();
    scheduler.start = jest.fn();
  })
  test('should start jsErrors and scheduler', () => {
    let APP_ID = 200;
    let API_KEY = 550;
    newRelicMetrics.start(APP_ID, API_KEY);
    expect(jsErrors.start.mock.calls.length).toEqual(1);
    expect(jsErrors.scheduleTask.mock.calls.length).toEqual(1);
    expect(jsErrors.scheduleTask.mock.calls[0][0]).toEqual(APP_ID);
    expect(jsErrors.scheduleTask.mock.calls[0][1]).toEqual(API_KEY);
    expect(scheduler.start.mock.calls.length).toEqual(1);
  })
})
