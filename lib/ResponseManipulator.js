"use strict";

var winston = require('winston');
var headerStrategyFactory = require('./Strategies/Factory/HeaderStrategyFactory');
var bodyStrategyFactory = require('./Strategies/Factory/BodyStrategyFactory');

module.exports.buildResponse = function(url, realResponse, modifiedResponse, rules) {
    var headerStrategy = headerStrategyFactory.getStrategy(url, rules);
    headerStrategy.process(realResponse, modifiedResponse, rules);

    var bodyStrategy = bodyStrategyFactory.getStrategy(url, rules);
    bodyStrategy.process(realResponse, modifiedResponse, rules);

    winston.info("Finished manipulating response");
};
