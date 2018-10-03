describe('default chart', () => {

  const DefaultChart = require('./default');

  test('should create new default chart object', () => {
    let chart = new DefaultChart({
      name: 'default_chart',
      help: 'description example'
    });
    expect(chart.name).toBe('default_chart');
    expect(chart.help).toBe('description example');
    expect(chart.labelNames).toBe('');
  })
  test('should throw missing help value error', () => {
    expect(() =>{new DefaultChart({
      name: 'default_chart'
    })})
    .toThrow();
  })
  test('should create new default chart object', () => {
    expect(() =>{new DefaultChart({
      help: 'description example'
    })})
    .toThrow();
  })
})
