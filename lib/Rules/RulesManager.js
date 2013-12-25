"use strict";

var FileWatcher = require('../FileWatcher');
var _ = require("underscore");
var Rule = require('../Rules/Rule');
var winston = require('winston');
var Schema = require("../../RulesSchema");
var JSV = require("JSV").JSV;
var Q = require("q");

var _rules;
var _rulesCallbacks = [];

module.exports.onRulesRead = function(callback) {
    _rulesCallbacks.push(callback);
};

module.exports.getRules = function () {
    return _rules;
};

module.exports.buildRules = function (rulesPath) {
    winston.info("Getting rules from path: " + rulesPath);

    var rulesWatcher = new FileWatcher(rulesPath);
    rulesWatcher.onFileRead(rulesFileRead);
    rulesWatcher.readFile();
};

function rulesFileRead(error, json) {
    if(error) return winston.error("Error reading file. Details: " + error);

    try {
        var parsedJSON = JSON.parse(json);
    } catch(e) {
        return winston.error("Error parsing JSON file");
    }

    if (!isJSONValid(parsedJSON)) return winston.error("The Rules JSON is not in a valid format. Please refer to RulesSchema.json to view the expected format.");
    winston.info("Rules are in a valid format, starting to process them.");

    buildRules(parsedJSON).then(informCallbacksThatRulesHaveBeenRead);
}

function isJSONValid(json) {
    var env = JSV.createEnvironment();
    var report = env.validate(json, Schema);
    return report.errors.length == 0;
}

function buildRules(parsedJSON) {
    var promises = parsedJSON.map(function(jsonItem) {
        return new Rule().initializeFromJson(jsonItem).then(null, function(error) {
            winston.error(error.message);
            promises.reject();
        });
    });
    return Q.all(promises);
}

function informCallbacksThatRulesHaveBeenRead(rules) {
    _rules = rules;

    _.each(_rulesCallbacks, function(callback) {
        callback(rules);
    });
}