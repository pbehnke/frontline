"use strict";

var FileWatcher = require('../FileReaders/FileWatcher');
var cfg = require("../../config");
var _ = require("underscore");

var _callbacks = [];

module.exports.buildRules = function() {
    var fileWatcher = new FileWatcher(cfg.paths.rules);

    fileWatcher.onFileRead(function(rules) {
        _.each(_callbacks, function(callback) { callback(rules); });
    });

    fileWatcher.readFile();
};

module.exports.onRulesRead = function(callback) {
    _callbacks.push(callback);
};

