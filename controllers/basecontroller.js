'use strict'

var restify = require('restify'),
  _ = require('underscore');

function BaseController() {
  this.actions = [];
  this.server = null;
}

BaseController.prototype.setUpActions = function(app, sw) {
  this.server = app;
  _.each(this.actions, function(act) { 
    var method = act['spec']['method'];
    console.log('Setting up auto-doc for (', method, ') - ', act['spec']['nickname']);
    sw['add' + method](act);
    app[method.toLowerCase()](act['spec']['path'], act['action']);
  });
}