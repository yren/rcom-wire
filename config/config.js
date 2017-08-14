'use strict'

var spotlight_host = 'http://apiservice.reuters.com';
var spotlight_common_param = 'format=json&apikey=72461C50B1CEAD3135BA6BDA53B203D3&deviceid=E7CDD293-9C3A-5AB9-9181-58E1B572DD44';
module.exports = {
  server: {
    name: 'Rcom Wire API',
    port: 3000
  },
  memcached: {
    host: '127.0.0.1:11211',
    //edition, channel, count
    keyformat: {
      //edition, channel, count
      wireitem: "wireitem__edition:%s,channel:%s,count:%d"
    }
  },
  spotlight: {
    channelitems: spotlight_host + '/api/feed/channelitems?' + spotlight_common_param
  },
  proxy: {
    host: 'http://10.90.7.56:3171/'
  }
}