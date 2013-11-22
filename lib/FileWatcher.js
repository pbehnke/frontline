var fileSystem = require("fs");
var winston = require("winston");
var chokidar = require('chokidar');

var _path;
var _callback;

var FileWatcher = function(path) {
    _path = path;
    var self = this;
    var watcher = chokidar.watch(_path, {ignored: /^\./, persistent: true});

    watcher.on("change", function() {
        self.readFile();
    });
};

FileWatcher.prototype.readFile = function() {
    fileSystem.readFile(_path, 'utf8', function(errror, data) {
        winston.info("Read file." + data);
        _callback(data);
    });
};

FileWatcher.prototype.onFileRead = function(callback) {
    _callback = callback;
};

module.exports = FileWatcher;