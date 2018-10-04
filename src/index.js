const server = require('./app/server');
const router = require('./app/router');
const prometheusPlugin = require('./plugins').prometheusPlugin;


server.route(router);
server.start();

prometheusPlugin.start();
