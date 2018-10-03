class DefaultChart {
  constructor({name, help, labelNames = ''}) {
    if (!name) {
      throw 'Missing name value!';
    }

    if (!help) {
      throw 'Missing help value!';
    }

    this.name = name;
    this.help = help;
    this.labelNames = labelNames;
  }
}

module.exports = DefaultChart;
