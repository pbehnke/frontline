"use strict";

var winston = require('winston');
var headerStrategyFactory = require('./Strategies/Factory/HeaderStrategyFactory');
var bodyStrategyFactory = require('./Strategies/Factory/BodyStrategyFactory');

module.exports.buildResponse = function(url, realResponse, modifiedResponse) {
    headerStrategyFactory.getStrategy(url).process(realResponse, modifiedResponse);
    bodyStrategyFactory.getStrategy(url).process(realResponse, modifiedResponse);
};
