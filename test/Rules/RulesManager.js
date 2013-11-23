"use strict";

var chai = require("chai");
var expect = chai.expect;
var proxyquire = require("proxyquire");

describe('Rules', function() {
    var fileWatcherStub = function(){
        this.onFileRead = function(callback) {
            this.callback = callback;
        };

        this.readFile = function() {
            this.callback('{"url": "www.google.com", "headers": {"a": "Some rules"}, "body": "Hello World"}');
        };
    };

    var rulesManager = proxyquire("../../lib/Rules/RulesManager", {"../FileWatcher": fileWatcherStub});

    describe('#buildRules()', function() {
        describe("if the rules get updated", function() {
            it('should signal any registered callbacks', function(done) {
                rulesManager.onRulesRead(function(rules) {
                    expect(rules.getUrl()).to.equal("www.google.com");
                    expect(rules.getHeaders()).to.deep.equal({
                        a: "Some rules"
                    });
                    expect(rules.getBody()).to.equal("Hello World");
                    done();
                });

                rulesManager.buildRules("somePath");
            });
        });
    });
});