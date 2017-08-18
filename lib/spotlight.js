'use strict';

var request = require('request'),
  util = require('util');

//http://apiservice.reuters.com/api/feed/channelitems?channel=world&count=10&topstorycount=10&edition=US&format=json&apikey=72461C50B1CEAD3135BA6BDA53B203D3&deviceid=E7CDD293-9C3A-5AB9-9181-58E1B572DD44
exports.getChannelItems = function(lib, chan, count, cb) {

  var options = {
    url: lib.config.spotlight.channelitems,
    qs: {edition: 'us', channel: chan, count: count},
    method: 'GET',
    json: true
  }
  var callback = function(error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(body);
    }
  }
  request(options, callback);
}

