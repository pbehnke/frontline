"use strict";

var chai = require("chai");
var expect = chai.expect;
var proxyquire = require("proxyquire");
var fileWatcher;

describe('Rules', function() {
    var chokadirStub = {
        watch: function() {
            return {
                on: function(name, callback) {
                    this.callback = callback;
                },
                fireOnChange: function() {
                    this.callback();
                }
            }
        }
    };

    var fileSystemStub = {
        readFile: function(path, encoding, callback) {
            callback(null, "Some data");
        }
    };

    var FileWatcher = proxyquire("../lib/FileWatcher", {"chokidar": chokadirStub, "fs": fileSystemStub});

    describe('#readFile()', function() {
        beforeEach(function() {
            fileWatcher = new FileWatcher("/some/path");
        });

        it('should signal any registered callbacks', function(done) {
            fileWatcher.onFileRead(function(data) {
               done();
            });

            fileWatcher.readFile();
        });
    });
});