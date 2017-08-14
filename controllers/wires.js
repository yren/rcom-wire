'use strict';

var BaseController = require('./basecontroller'),
  _ = require('underscore'),
  request = require('request'),
  util = require('util'),
  swagger = require('swagger-node-restify');

function Wires() {
}

Wires.prototype = new BaseController();

module.exports = function(lib) {
  var controller = new Wires(),
    helpers = lib.helpers,
    memcached = lib.memcachedutil.memcached,
    keyformat = lib.config.memcached.keyformat;
  
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
    var edition = req.query.edition, 
      chan = req.query.chan,
      count = req.query.count,
      since = req.query.since,
      until = req.query.until;
      
      if (!edition) {
        edition = 'us';
      }
      if (!chan) {
        chan = 'world';
      }
      if (!count) {
        count = 20;
      }
      var cacheKey = util.format(keyformat.wireitem, edition, chan, count);
      res.send('cacheKey:' + cacheKey);
      next();
  });
  
  return controller;
}