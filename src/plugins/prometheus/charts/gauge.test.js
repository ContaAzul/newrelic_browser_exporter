describe('gauge chart', () => {

  const GaugeChart = require('./gauge');

  test('should create new default chart object', () => {
    let chart = new GaugeChart({
      name: 'gauge_chart',
      help: 'description example'
    });
    expect(chart.name).toBe('gauge_chart');
    expect(chart.help).toBe('description example');
    expect(chart.labelNames).toBe('');
  })

  test('should set chart value', () => {
    let chart = new GaugeChart({
      name: 'gauge',
      help: 'description example'
    });
    chart.setValues(400);
    expect(chart.chart.hashMap[''].value).toBe(400);
  })
})
