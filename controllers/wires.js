'use strict';

var BaseController = require('./basecontroller'),
  _ = require('underscore'),
  request = require('request'),
  errors = require('restify-errors'),
  swagger = require('swagger-node-restify');

function Wires() {
}

Wires.prototype = new BaseController();

module.exports = function(lib) {
  var controller = new Wires(),
    helpers = lib.helpers,
    memcachedutil = lib.memcachedutil,
    spotlight = lib.spotlight,
    memcached = memcachedutil.memcached;
  
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
      var cacheKey = memcachedutil.getWireCacheKey(edition, chan, count, since, until);
      memcached.get(cacheKey, function(err, data) {
        if (data) {
          console.log(helpers.inspectObj(data));
          res.send(data);
        } else {
          spotlight.getChannelItems(lib, chan, count, function(body) {
            memcached.set(cacheKey, body, 60, function(err) {
              if (!err) {
                console.log('set body to memcached');
              }
            })
            console.log('send body from spotlight');
            console.log(helpers.inspectObj(body));
            res.send(body);
          })
        }
      });
      next();
  });
  
  return controller;
}