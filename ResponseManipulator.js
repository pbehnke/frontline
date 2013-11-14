"use strict";

var winston = require('winston');
var headerStrategyFactory = require('./Strategies/HeaderStrategyFactory');

module.exports.buildResponse = function(realResponse, modifiedResponse) {
    headerStrategyFactory.getStrategy().process(realResponse, modifiedResponse);
    winston.info("Finished manipulating response.");
    modifiedResponse.end();
};
