'use strict'

var BaseController = require('./basecontroller'),
  _ = require('underscore'),
  swagger = require('swagger-node-restify');

function Articles() {
  
}

Articles.prototype = new BaseController();

module.exports = function(lib) {
  var controller = new Articles(),
    memcached = lib.memcached();
  
  controller.addAction({
    'path': '/v1/channelarticles/{edition}/{channel}',
    'method': 'GET',
    'summary': 'Return list of channel articles',
    'params': [ swagger.pathParam('edition', 'artciel edtion','string'), swagger.pathParam('channel', 'artciel channel','string')],
    'nickname': 'v1.getChannelArticles'
  }, function(req, res, next) {
    var edition = req.params.edition;
    var channel = req.params.channel;
    var path = req.path();
    var key = path;
    memcached.get(key, function(err, data){
      if (data) {
        console.log('get content from memcached');
        res.send('memcached response: ' + data);
      } else {
        var value = 'edition: ' + edition + ' channel: ' + channel + ' path: ' + path;
        res.send(value);
        memcached.set(key, value, 60000, function(err) {
          if (err) {
            console.log('save memcached err, key: ' + key);
          }
        })
      }
    });
    
    return next();
  });
  
  return controller;
}