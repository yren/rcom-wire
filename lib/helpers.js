'use strict';

module.exports = {
  setupRoutes: setupRoutes,
  queryParam: queryParam,
  pathParam: pathParam,
  bodyParam: bodyParam,
  headerParam: headerParam
};

function setupRoutes(server, swagger, lib) {
  for(var controller in lib.controllers) {
    var cont = lib.controllers[controller](lib);
    cont.setUpActions(server, swagger);
  }
}

function queryParam(name, dataType, description, required, defaultValue, allowableValues, allowMultiple) {
  return {
    "name" : name,
    "dataType" : dataType,
    "description" : description,
    "required" : required,
    "defaultValue" : defaultValue,
    "allowableValues" : allowableValues,
    "allowMultiple" : allowMultiple,
    "paramType" : "query"
  }
}

function pathParam(name, dataType, description, allowableValues, defaultValue) {
  return {
    "name" : name,
    "dataType" : dataType,
    "description" : description,
    "required" : true,
    "defaultValue" : defaultValue,
    "allowableValues" : allowableValues,
    "allowMultiple" : false,
    "paramType" : "path"
  };
}

function bodyParam(name, dataType, description, defaultValue) {
  return {
    "name" : name,
    "dataType" : dataType,
    "description" : description,
    "required" : true,
    "allowMultiple" : false,
    "defaultValue" : defaultValue,
    "paramType" : "body"
  };
}
  
function headerParam(name, dataType, description, required) {
  return {
    "name" : name,
    "dataType" : dataType,
    "description" : description,
    "required" : required,
    "allowMultiple" : false,
    "paramType" : "header"
  };
}

