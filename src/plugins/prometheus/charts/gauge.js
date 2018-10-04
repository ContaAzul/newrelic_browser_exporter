const Gauge = require('../../prometheus').charts.gauge;
const DefaultChart = require('./default');
class GaugeChart extends DefaultChart {
  constructor(props) {
    super(props);
    this.create();
  }
  create() {
    this.chart = new Gauge({
      name: this.name,
      help: this.help,
      labelNames: this.labelNames
    });
  }
  setValues(values) {
    this.chart.set(values);
  }
}
module.exports = GaugeChart;
