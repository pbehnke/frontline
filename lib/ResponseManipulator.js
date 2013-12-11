"use strict";

var headerStrategyFactory = require('./Strategies/Factory/HeaderStrategyFactory');
var bodyStrategyFactory = require('./Strategies/Factory/BodyStrategyFactory');
var _ = require('underscore');

module.exports.buildResponse = function(url, realResponse, modifiedResponse, rulesManager) {
    var rules = rulesManager.getRules();

    _.each(rules, function processRuleThatMatchesCurrentUrl(rule) {
        if(url.toLowerCase().indexOf(rule.getUrl().toLowerCase()) != -1) {
            getStrategies(url, realResponse, modifiedResponse, rule);
        }
    });

    getStrategies(url, realResponse, modifiedResponse);
};

function getStrategies(url, realResponse, modifiedResponse, rule) {
    headerStrategyFactory.getStrategy(url, realResponse, rule).process(modifiedResponse);
    bodyStrategyFactory.getStrategy(url, realResponse, rule).process(modifiedResponse);
}