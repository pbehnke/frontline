"use strict";

var FileWatcher = require('../FileWatcher');
var cfg = require("../../config");
var _ = require("underscore");
var Rules = require('../RulesEngine/Rules');
var async = require('async');

var _rulesCallbacks = [];

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
    function(err, results){
        var rules = new Rules(results[0], results[1]);
    });

    rulesWatcher.readFile();
    bodyWatcher.readFile();
};

module.exports.onRulesRead = function(callback) {
    _rulesCallbacks.push(callback);
};