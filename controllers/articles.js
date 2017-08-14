'use strict'

var BaseController = require('./basecontroller'),
  _ = require('underscore'),
  swagger = require('swagger-node-restify');

function Articles() {
  
}

Articles.prototype = new BaseController();

module.exports = function(lib) {
  var controller = new Articles(),
    helpers = lib.helpers,
    memcached = lib.memcachedutil.memcached;
  
  controller.addAction({
    'path': '/channelarticles/{edition}/{channel}',
    'method': 'GET',
    'summary': 'Return list of channel articles',
    'params': [
      //pathParam: name, dataType, description, allowableValues, defaultValue
      helpers.pathParam('edition', 'string', 'artciel edtion'),
      helpers.pathParam('channel', 'string', 'article channel'),
      //queryParam: name, dataType, description, required, defaultValue, allowableValues, allowMultiple
      helpers.queryParam('count', 'int', 'article number, default 10', false)
    ],
    'nickname': 'getChannelArticles'
  }, function(req, res, next) {
    var edition = req.params.edition;
    var channel = req.params.channel;
    var count = req.query.count;
    var path = req.path();
    var key = path;
    memcached.get(key, function(err, data){
      if (data) {
        console.log('get content from memcached');
        res.send('memcached response: ' + data);
      } else {
        var value = 'edition: ' + edition + ' channel: ' + channel + ' path: ' + path + 'count: ' + count;
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