"use strict";

var winston = require('winston');
var headerStrategy = require('./Strategies/Headers/ReturnOriginalHeaders');

var ResponseManipulator = function() {};

ResponseManipulator.prototype.buildResponse = function(realResponse, modifiedResponse) {
    headerStrategy.process(realResponse, modifiedResponse);
    modifiedResponse.end();
};

module.exports = ResponseManipulator;
