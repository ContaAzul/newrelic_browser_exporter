describe('default chart', () => {
  const scheduler = require('./scheduler');
  const cron = require('node-cron');
  const DEFAULT_INTERVAL = '* * * * *';

  beforeEach(() => {
    cron.schedule = jest.fn();
  });

  test('should call cron.schedule', () => {
    scheduler.start(() => {});

    expect(cron.schedule.mock.calls.length).toBe(1);
    expect(cron.schedule.mock.calls[0][0]).toBe(DEFAULT_INTERVAL);
  })

  test('should not call cron.schedule', () => {
    scheduler.start();

    expect(cron.schedule.mock.calls.length).toBe(0);
  })
})
