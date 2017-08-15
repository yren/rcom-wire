'use strict';

var Memcached = require('memcached'),
  config = require('../config/config');

var memcached = new Memcached(config.memcached.host, config.memcached.options);
memcached.on('failure', function( details ){
  console.log( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ) });
memcached.on('reconnecting', function( details ){
  console.log( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")});

var keyformat = {
    //edition, channel, count
    wireitem: "wireitem__edition:%s,channel:%s,count:%d"
}

exports.memcached = memcached;
