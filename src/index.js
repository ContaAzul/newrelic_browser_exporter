const config = require('./app/config');
const server = require('./app/server');
const router = require('./app/router');
const newRelicPlugin = require('./plugins').newRelicPlugin;
const prometheusPlugin = require('./plugins').prometheusPlugin;

server.route(router);
server.start();

prometheusPlugin.start();
newRelicPlugin.start(config.APP_ID, config.API_KEY);


