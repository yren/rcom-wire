'use strict';

var lib = {
  config: require('../config/config'),
  controllers: require('../controllers'),
  helpers: require('./helpers'),
  schemas: require("../schemas"),
  memcached: require('./memcached')
};

module.exports = lib;