"use strict";

var FileWatcher = require('../FileWatcher');
var cfg = require("../../config");
var _ = require("underscore");
var Rules = require('../Rules/Rules');

var _rulesCallbacks = [];
var _rules;

module.exports.buildRules = function() {
    var rulesWatcher = new FileWatcher(cfg.paths.rules);

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