'use strict';

var Memcached = require('memcached');
var config = require('../config/config');


module.exports = function() {
  var memcached = new Memcached(config.memcached.host, {poolSize: 20, timeout: 5000});
  
  memcached.on('failure', function( details ){
    console.log( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ) });
  memcached.on('reconnecting', function( details ){
    console.log( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")});
  return memcached;
}
