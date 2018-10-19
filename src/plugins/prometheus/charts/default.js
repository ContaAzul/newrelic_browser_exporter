class DefaultChart {
  constructor({
    name,
    help,
    labelNames = '',
  }) {
    if (!name) {
      throw new Error('Missing name value!');
    }

    if (!help) {
      throw new Error('Missing help value!');
    }

    this.name = name;
    this.help = help;
    this.labelNames = labelNames;
  }
}


module.exports = DefaultChart;
