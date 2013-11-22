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

    async.parallel([
        function(callback){
            rulesWatcher.onFileRead(function(data) {
                callback(null, data);
            });
        },
        function(callback){
            bodyWatcher.onFileRead(function(data) {
                callback(null, data);
            });
        }
    ],
    // optional callback
    function(err, results) {
        _rules = JSON.parse(results[0]);
        _body = results[1];

        var currentRules = new Rules(_rules, _body);

        _.each(_rulesCallbacks, function(callback) { callback(currentRules); });

//        rulesWatcher.onFileRead(function(data) {
//            this._rules = JSON.parse(results[0]);
//
//        });
    });

    rulesWatcher.readFile();
    bodyWatcher.readFile();
};

module.exports.onRulesRead = function(callback) {
    _rulesCallbacks.push(callback);
};