'use strict'

var restify = require("restify");

function BaseController() {
  this.actions = [];
  this.server = null;
}