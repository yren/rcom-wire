'use strict';

module.exports = {
  setupRoutes: setupRoutes
};


function setupRoutes(server, swagger, lib) {
  for(controller in lib.controllers) {
    cont = lib.controllers[controller](lib)
    cont.setUpActions(server, swagger)
  }
}
