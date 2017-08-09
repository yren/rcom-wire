'use strict'

var BaseController = require('./basecontroller'),
  _ = require('underscore'),
  swagger = require('swagger-node-restify');

function Articles() {
  
}

Articles.prototype = new BaseController();

module.exports = function(lib) {
  var controller = new Articles();
  controller.addAction({
    'path': '/channelarticles/{edition}/{channel}',
    'method': 'GET',
    'summary': 'Return list of channel articles',
    'params': [ swagger.pathParam('edition', 'artciel edtion','string'), swagger.pathParam('channel', 'artciel channel','string')],
    'nickname': 'getChannelArticles'
  }, function(req, res, next) {
    var edition = req.params.edition;
    var channel = req.params.channel;
    console.log('edition: ' + edition);
    console.log('channel: ' + channel);
  });
  
  return controller;
}