"use strict";

var chai = require("chai");
var expect = chai.expect;
var proxyquire = require("proxyquire");
var fileWatcher;

describe('Rules', function() {
    var chokadirStub = function(){
        var _callback;

        return {
            watch: function() {
                return {
                    on: function(name, callback) {
                        _callback = callback;
                    }
                };
            },
            fireOnChange: function() {
                _callback();
            }
        };
    }();

    var fileSystemStub = {
        readFile: function(path, encoding, callback) {
            callback(null, expectedFileContent);
        }
    };

    var expectedFileContent = "Some data";

    var FileWatcher = proxyquire("../lib/FileWatcher", {"chokidar": chokadirStub, "fs": fileSystemStub});

    beforeEach(function() {
        fileWatcher = new FileWatcher("/some/path");
    });

    describe('#constructor', function() {
        describe('when path is null', function() {
            it("should return an error", function(done) {
                try {
                    new FileWatcher(null);
                } catch(e) {
                    done();
                }
            });
        });
    });

    describe('#readFile()', function() {
        it('should signal any registered callbacks', function(done) {
            fileWatcher.onFileRead(function(data) {
                expect(data).to.equal(expectedFileContent);
                done();
            });

            fileWatcher.readFile();
        });
    });

    describe('Chokadir file system changes', function() {
        it('should signal any registered callbacks', function(done) {
            fileWatcher.onFileRead(function(data) {
                done();
            });

            chokadirStub.fireOnChange();
        });
    });
});