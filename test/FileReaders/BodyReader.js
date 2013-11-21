var chai = require("chai");
var expect = chai.expect;
var proxyquire = require("proxyquire");
var BodyReader;

describe('FileWatcher', function(){
    var bodyReader;
    var fakeBodyText = "Some fake body text";

    var fakeFileSystem = {
        readFile: function(path, encoding, callback) {
            callback(undefined, fakeBodyText);
        }
    };

    var fakeChokidar = {
        callbackFunction: undefined,
        watch: function() {
            return {
                on: function(name, callback) {
                    callbackFunction = callback;
                }
            }
        },
        getCallback: function() {
            return callbackFunction;
        }
    };

    BodyReader = proxyquire("../../lib/FileReaders/FileWatcher", {"fs": fakeFileSystem, "chokidar": fakeChokidar});

    describe('when a callback is registered', function(){
        beforeEach(function() {
            bodyReader = new BodyReader("Body.html");
        });

        it("should get called when read read is complete", function(done) {
            bodyReader.onBodyReady(function() {
                done();
            });

            bodyReader.readBody();
        });
    });

    describe("when the body file changes", function() {
        it("should read the body and trigger an event", function(done) {
            bodyReader.onBodyReady(function() {
                done();
            });

            fakeChokidar.getCallback()();
        });
    });
});