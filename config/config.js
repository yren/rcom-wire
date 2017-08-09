'use strict'

module.exports = {
  server: {
    name: 'Rcom Wire API',
    version: '0.0.1',
    port: 3000
  },
  memcached: {
    host: '127.0.0.1:11211'
  },
  spotlight: {
    host: 'http://apiservice.reuters.com'
  },
  proxy: {
    host: 'http://10.90.7.56:3171/'
  }
}