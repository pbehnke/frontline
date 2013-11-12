"use strict";

var clonePage = require('./ClonePage');

var ResponseManipulator = function() {};

ResponseManipulator.prototype.buildResponse = function(realResponse, modifiedResponse) {
    modifiedResponse.writeHead(realResponse.statusCode, {'Content-Type': 'text/plain'});
    modifiedResponse.end();
};

module.exports = ResponseManipulator;
