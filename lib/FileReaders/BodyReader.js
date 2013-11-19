var fileSystem = require("fs");
var winston = require("winston");
var chokidar = require('chokidar');
var Rules = require('./../Rules');

var _path;
var _callback;

var BodyReader = function(path) {
    _path = path;
    var self = this;
    var watcher = chokidar.watch(_path, {ignored: /^\./, persistent: true});

    watcher.on("change", function() {
        self.readBody();
    });
};

BodyReader.prototype.readBody = function() {
    fileSystem.readFile(_path, 'utf8', function(errror, data) {
        winston.info("Reading Body." + data);
        _callback(data);
    });
};

BodyReader.prototype.onBodyReady = function(callback) {
    _callback = callback;
};

module.exports = BodyReader;