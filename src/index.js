const server = require('./app/server');
const router = require('./app/router');

server.route(router);
server.start();
