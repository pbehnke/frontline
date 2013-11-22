"use strict";

var FileWatcher = require('../FileWatcher');
var cfg = require("../../config");
var _ = require("underscore");
var Rules = require('../Rules/Rules');
var async = require('async');

var _rulesCallbacks = [];
var _rules;
var _body;

module.exports.buildRules = function() {
    var rulesWatcher = new FileWatcher(cfg.paths.rules);
    var bodyWatcher = new FileWatcher(cfg.paths.body);

    var parallelCallbackWrapper = function(watcher) {
        return function(callback){
            watcher.onFileRead(function(data) {
                callback(null, data);
            });
        };
    };

    var callbackComplete = function(err, results) {
        _rules = JSON.parse(results[0]);
        _body = results[1];

        var currentRules = new Rules(_rules, _body);

        _.each(_rulesCallbacks, function(callback) { callback(currentRules); });

        rulesWatcher.onFileRead(function(data) {
            _rules = JSON.parse(data);
            var currentRules = new Rules(_rules, _body);
            _.each(_rulesCallbacks, function(callback) { callback(currentRules); });
        });

        bodyWatcher.onFileRead(function(data) {
            _body = data;
            var currentRules = new Rules(_rules, _body);
            _.each(_rulesCallbacks, function(callback) { callback(currentRules); });
        });
    };

    async.parallel([parallelCallbackWrapper(rulesWatcher), parallelCallbackWrapper(bodyWatcher)], callbackComplete);

    rulesWatcher.readFile();
    bodyWatcher.readFile();
};

module.exports.onRulesRead = function(callback) {
    _rulesCallbacks.push(callback);
};