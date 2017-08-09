'use strict';

module.exports = {
  setupRoutes: setupRoutes
};

function setupRoutes(server, swagger, lib) {
  for(var controller in lib.controllers) {
    var cont = lib.controllers[controller](lib);
    cont.setUpActions(server, swagger);
  }
}
