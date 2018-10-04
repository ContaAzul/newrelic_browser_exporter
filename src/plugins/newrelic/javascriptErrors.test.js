describe('javascriptErrors', () => {
  const javascriptErrors = require('./javascriptErrors');
  const browser = require('./api-request');
  beforeEach(() => {
    browser.collectData = jest.fn();
  });
  test('should create gauge chart', () => {
    let chart = javascriptErrors.start();
    expect(chart.name).toBe('JS_Errors');
    expect(chart.help).toBe('return a percentage of pageviews with javascript errors');
    expect(chart.labelNames).toBe('');
  })
  test('should call browser.collectData', () => {
    javascriptErrors.scheduleTask(50, 250)();
    expect(browser.collectData.mock.calls.length).toBe(1);
  })
  test('should call browser.collectData', () => {
    let percentage;
    let body = {
      metric_data: {
        metrics: [{
          timeslices: [{
            values: {
              error_percentage: 1.27
            }
          }]
        }]
      }
    }
    browser.collectData = jest.fn().mockImplementation((APP_ID, API_KEY, names, values, callback) => {
      percentage = callback(null, null, JSON.stringify(body));
    });
    javascriptErrors.scheduleTask(50, 250)()
    expect(percentage).toBe(1.27);
  })
})
