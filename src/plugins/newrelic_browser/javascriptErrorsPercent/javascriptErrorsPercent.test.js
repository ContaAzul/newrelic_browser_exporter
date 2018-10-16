const javascriptErrors = require('./javascriptErrorsPercent');
const browser = require('../api-request');

describe('javascriptErrorsPercent', () => {
  beforeEach(() => {
    browser.collectData = jest
      .fn()
      .mockResolvedValue(JSON.stringify({
        metric_data: {
          metrics: [{
            timeslices: [{
              values: {
                error_percentage: 2.5,
              },
            }],
          }],
        },
      }));
  });

  test('should call browser.collectData', async () => {
    javascriptErrors.collectData();
    expect(browser.collectData.mock.calls.length).toBe(1);
    expect(browser.collectData.mock.calls[0][0]).toBe('EndUser/errors');
    expect(browser.collectData.mock.calls[0][1]).toBe('error_percentage');
  });
});
