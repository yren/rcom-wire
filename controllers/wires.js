'use strict';

var BaseController = require('./basecontroller'),
  _ = require('underscore'),
  swagger = require('swagger-node-restify');

function Wires() {
}

Wires.prototype = new BaseController();

module.exports = function(lib) {
  var controller = new Wires(),
    helpers = lib.helpers,
    memcached = lib.memcached();
  
  controller.addAction({
    'path': '/wire',
    'method': 'GET',
    'summary': 'Return list of wire items',
    'params': [
      //queryParam: name, dataType, description, required, defaultValue, allowableValues, allowMultiple
      helpers.queryParam('chan', 'string', 'channel name', false, 'world'),
      helpers.queryParam('count', 'int', 'wire items number', false, 20),
      helpers.queryParam('since', 'time', 'returns only items newer than the date (unix timestamp + nanoseconds)'),
      helpers.queryParam('until', 'time', 'returns only items older than the date (unix timestamp + nanoseconds)')
    ],
    'nickname': 'getWires'
  }, function(req, res, next) {
    var chan = req.params.chan,
      count = req.params.count,
      since = req.params.since,
      until = req.params.until;
      
      res.send('chan:' + chan + ', count:' + count + ', since:' + since + 'until:' + until);
      next();
  });
  
  return controller;
}