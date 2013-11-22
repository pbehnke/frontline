"use strict";

var FileWatcher = require('../FileWatcher');
var cfg = require("../../config");
var _ = require("underscore");
var Rules = require('../RulesEngine/Rules');

var _rulesCallbacks = [];
var _rules;
var _body;

module.exports.buildRules = function() {
    var rulesWatcher = new FileWatcher(cfg.paths.rules);
    var bodyWatcher = new FileWatcher(cfg.paths.body);

    rulesWatcher.onFileRead(function(rulesJson) {
//        rules = new Rules(rulesJson);
//        _.each(_rulesCallbacks, function(callback) { callback(rules); });
    });

    bodyWatcher.onFileRead(function(data) {
//        _body = data;
    });

    rulesWatcher.readFile();
    bodyWatcher.readFile();
};

module.exports.onRulesRead = function(callback) {
    _rulesCallbacks.push(callback);
};

function tryToUpdateFirstRun(firstRun, counter) {
    var s = "";
}