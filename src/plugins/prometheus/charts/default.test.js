const DefaultChart = require('./default');

describe('default chart', () => {
  test('should create new default chart object', () => {
    const chart = new DefaultChart({
      name: 'default_chart',
      help: 'description example',
    });
    expect(chart.name).toBe('default_chart');
    expect(chart.help).toBe('description example');
    expect(chart.labelNames).toBe('');
  });

  test('should throw missing help value error', () => {
    const error = new Error('Missing help value!');
    const options = {
      name: 'default_chart',
    };

    expect(() => {
      /* eslint no-new: 0 */
      new DefaultChart(options);
    })
      .toThrow(error);
  });
  test('should create new default chart object', () => {
    const error = new Error('Missing name value!');
    const options = {
      help: 'description example',
    };

    expect(() => {
      /* eslint no-new: 0 */
      new DefaultChart(options);
    })
      .toThrow(error);
  });
});
