describe('prometheus index', () => {
  const prometheusPlugin = require('./index');
  const client = require('prom-client');
  let scheduler = require('../../utils/scheduler');

  beforeEach(() => {
    client.collectDefaultMetrics = jest.fn();
    scheduler.start = jest.fn();
  });

  test('should call scheduler.start', () => {
    prometheusPlugin.start();
    expect(scheduler.start.mock.calls.length).toBe(1);
  })

  test('should call client.collectDefaultMetrics', () => {
    scheduler.start = jest.fn((callback) => callback('someData'));
    prometheusPlugin.start();
    expect(client.collectDefaultMetrics.mock.calls.length).toBe(1);
  })
})
