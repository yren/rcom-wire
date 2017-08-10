'use strict';

var restify = require('restify'),
  swagger = require('swagger-node-restify'),
  _ = require('underscore'),
  lib = require('./lib'),
  config = lib.config;

var server = restify.createServer(config.server);

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

swagger.setAppHandler(server);
lib.helpers.setupRoutes(server, swagger, lib);

server.listen(config.server.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});