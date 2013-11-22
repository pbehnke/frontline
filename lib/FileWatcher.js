var fileSystem = require("fs");
var winston = require("winston");
var chokidar = require('chokidar');

var FileWatcher = function(path) {
    var self = this;
    this.path = path;

    var watcher = chokidar.watch(this.path, {ignored: /^\./, persistent: true});

    watcher.on("change", function() {
        self.readFile();
    });
};

FileWatcher.prototype.readFile = function() {
    var self = this;
    fileSystem.readFile(this.path, 'utf8', function(errror, data) {
        winston.info("Read file." + data);
        self.callback(data);
    });
};

FileWatcher.prototype.onFileRead = function(callback) {
    var self = this;
    self.callback = callback;
};

module.exports = FileWatcher;