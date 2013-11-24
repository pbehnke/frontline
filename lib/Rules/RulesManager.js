"use strict";

var FileWatcher = require('../FileWatcher');
var _ = require("underscore");
var Rules = require('../Rules/Rules');
var winston = require('winston');

var _rulesCallbacks = [];
var _rules;

module.exports.buildRules = function(rulesPath) {
    var rulesWatcher = new FileWatcher(null);

    rulesWatcher.onFileRead(function(data) {
        _rules = JSON.parse(data);
        var currentRules = new Rules(_rules);
        _.each(_rulesCallbacks, function(callback) { callback(currentRules); });
    });

    rulesWatcher.readFile();
};

module.exports.onRulesRead = function(callback) {
    _rulesCallbacks.push(callback);
};