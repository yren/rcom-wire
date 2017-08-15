'use strict';

var Memcached = require('memcached'),
  config = require('../config/config'),
  util = require('util');

var memcached = new Memcached(config.memcached.host, config.memcached.options);
memcached.on('failure', function( details ){
  console.log( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ) });
memcached.on('reconnecting', function( details ){
  console.log( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")});

exports.memcached = memcached;

var keyformat = {
    //edition, channel, count
    wireitem: "wireitem__edition:%s,channel:%s,count:%d,since:%s,until:%s"
}

exports.getWireCacheKey = function(edition, channel, count, since, until) {
  if (!since) {
    since = '';
  }
  if (!until) {
    until = '';
  }
  return util.format(keyformat.wireitem, edition, channel, count, since, until);
}
