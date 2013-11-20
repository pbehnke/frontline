"use strict";

var winston = require('winston');
var headerStrategyFactory = require('./Strategies/Factory/HeaderStrategyFactory');
var bodyStrategyFactory = require('./Strategies/Factory/BodyStrategyFactory');

var _rules;

module.exports.setRules = function(rules) {
    _rules = rules;
};

module.exports.buildResponse = function(url, realResponse, modifiedResponse) {
    var headerStrategy = headerStrategyFactory.getStrategy(url, _rules);
    headerStrategy.process(realResponse, modifiedResponse, _rules);

    bodyStrategyFactory.getStrategy().process(realResponse, modifiedResponse);

    winston.info("Finished manipulating response.");
};
