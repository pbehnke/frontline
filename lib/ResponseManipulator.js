"use strict";

var winston = require('winston');
var headerStrategyFactory = require('./Strategies/Factory/HeaderStrategyFactory');
var bodyStrategyFactory = require('./Strategies/Factory/BodyStrategyFactory');

module.exports.buildResponse = function(realResponse, modifiedResponse) {
    headerStrategyFactory.getStrategy().process(realResponse, modifiedResponse);
    bodyStrategyFactory.getStrategy().process(realResponse, modifiedResponse);
    winston.info("Finished manipulating response.");
};
