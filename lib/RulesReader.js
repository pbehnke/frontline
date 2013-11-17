var fileSystem = require("fs");
var cfg = require("./../Config");
var winston = require("winston");
var chokidar = require('chokidar');

var rulesReadCallbacks = [];

var RulesReader = function() {
    var self = this;
    var watcher = chokidar.watch("Rules.json", {ignored: /^\./, persistent: true});

    watcher.on("change", function(path) {
        self.readRules();
    });
};

RulesReader.prototype.readRules = function() {
    fileSystem.readFile(cfg.paths.rules, 'utf8', function(errror, data) {
        var jsonData = JSON.parse(data);
        winston.info("Reading Rules." + data);

        var rules = new Rules(jsonData);

        for(var i = 0; i < rulesReadCallbacks.length; i++) {
            rulesReadCallbacks[i](rules);
        }
    });
};

RulesReader.prototype.onRulesRead = function(callback) {
    rulesReadCallbacks.push(callback);
};

module.exports = RulesReader;