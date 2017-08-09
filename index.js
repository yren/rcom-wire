'use strict';

var restify = require('restify'),
  swagger = require('swagger-node-restify'),
  lib = require('./lib'),
  config = lib.config;
  
console.log(config);

var server = restify.createServer(config.server);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(config.server.port, function() { 
  console.log('%s listening at %s', server.name, server.url);
});