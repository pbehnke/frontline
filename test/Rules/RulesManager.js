"use strict";

var chai = require("chai");
var expect = chai.expect;
var proxyquire = require("proxyquire");
var ShouldBeCalled = require("../TestUtils").ShouldBeCalled;

describe('RulesManager', function() {
    var fileWatcherStub = function(){
        this.onFileRead = function(callback) {
            this.callback = callback;
        };
    };

    var rulesManager;

    describe('#buildRules()', function() {
        describe("when file can not be read", function() {
            before(function() {
                fileWatcherStub.prototype.readFile = function() {
                    this.callback("There was an error");
                };

                rulesManager = proxyquire("../../lib/Rules/RulesManager", {"../FileWatcher": fileWatcherStub});
            });

            it("should never execute the callbacks", function() {
                rulesManager.onRulesRead(new ShouldBeCalled(false));
                rulesManager.buildRules("somePath");
            });
        });

        describe("when invalid JSON is provided", function() {
            before(function() {
                fileWatcherStub.prototype.readFile = function() {
                    this.callback(null, "blah");
                };

                rulesManager = proxyquire("../../lib/Rules/RulesManager", {"../FileWatcher": fileWatcherStub});
            });

            it("should never execute the callbacks", function() {
                rulesManager.onRulesRead(new ShouldBeCalled(false));
                rulesManager.buildRules("somePath");
            });
        });

        describe("when valid JSON is provided", function() {
            before(function() {
                fileWatcherStub.prototype.readFile = function() {
                    this.callback(null, '[{"url":"sebtest.com/abc","headers":{"Content-Type":"application/json"},"body":"a"}]');
                };

                var fakeRule = function() {
                    this.initializeFromJson = function() {
                        return  {
                            then: function(success, failed) {
                            }
                        }
                    }
                };

                rulesManager = proxyquire("../../lib/Rules/RulesManager", {"../FileWatcher": fileWatcherStub, "../Rules/Rule": fakeRule});
            });

            it("should build an array of one rule", function(done) {
                rulesManager.onRulesRead(function(value) {
                    expect(value.length).to.equal(1);
                    done();
                });
                rulesManager.buildRules("somePath");
            });
        });

        describe("when valid 2 rules are provided", function() {
            before(function() {
                fileWatcherStub.prototype.readFile = function() {
                    this.callback(null, '[{"url":"sebtest.com/abc","headers":{"Content-Type":"application/json"},"body":"a"}, {"url":"sebtest.com/abc","headers":{"Content-Type":"application/json"},"body":"a"}]');
                };

                var fakeRule = function() {
                    this.initializeFromJson = function() {
                        return  {
                            then: function(success, failed) {
                            }
                        }
                    }
                };

                rulesManager = proxyquire("../../lib/Rules/RulesManager", {"../FileWatcher": fileWatcherStub, "../Rules/Rule": fakeRule});
            });

            it("should build 2 rules", function(done) {
                rulesManager.onRulesRead(function(value) {
                    expect(value.length).to.equal(2);
                    done();
                });
                rulesManager.buildRules("somePath");
            });
        });
    });
});