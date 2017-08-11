'use strict';

var restify = require('restify'),
  swagger = require('swagger-node-restify'),
  _ = require('underscore'),
  lib = require('./lib'),
  config = lib.config;

var server = restify.createServer(config.server);
//cleans up duplicate or trailing / on the URL
server.pre(restify.pre.sanitizePath());

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get(/^\/swagger-ui(\/.*)?/, restify.plugins.serveStatic({
 	directory: __dirname + '/',
 	default: 'index.html'
}));

swagger.addModels(lib.schemas);
swagger.setAppHandler(server);
lib.helpers.setupRoutes(server, swagger, lib);
swagger.configureSwaggerPaths("", "/api-docs", "");
swagger.configure('http://localhost:3000', '0.1');

server.listen(config.server.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});