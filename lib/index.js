'use strict';

var lib = {
  config: require('../config/config'),
  controllers: require('../controllers'),
  helpers: require('./helpers'),
  schemas: require("../schemas"),
  memcachedutil: require('./memcachedutil'),
  spotlight: require('./spotlight')
};

module.exports = lib;