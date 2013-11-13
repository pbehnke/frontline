"use strict";

var winston = require('winston');
var headerStrategy = require('./Strategies/Headers/ReturnOriginalHeaders');

var ResponseManipulator = function() {};

ResponseManipulator.prototype.buildResponse = function(realResponse, modifiedResponse) {
    headerStrategy.process(realResponse, modifiedResponse);
};

module.exports = ResponseManipulator;
