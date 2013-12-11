"use strict";

var chai = require("chai");
var expect = chai.expect;
var proxyquire = require("proxyquire");

describe('ResponseManipulator', function(){
    var url = "http://www.google.com";
    var realResponse = {};
    var modifiedResponse = {};
    var fakeRules = {};
    var headerStrategyFactoryStub;
    var bodyStrategyFactoryStub;
    var responseManipulator;

    var StrategyFactoryStub = function() {
        return {
            getStrategy: function(url, realResponse, rule) {
                this.rule = rule;

                return {
                    process: function(modifiedResponse) {
                        // Do nothing
                    }
                }
            },
            assertWasCalledWithRule: function(expected, ruleToCheck) {
                if(!expected && this.rule) throw new Error("Strategy factory was called, but was not expected.");
                if(this.rule === undefined) return;
                expect(ruleToCheck).to.deep.equal(this.rule);
            }
        }
    };

    var rulesManagerStub = {
        getRules: function() {
            return fakeRules;
        }
    };

    beforeEach(function() {
        headerStrategyFactoryStub = new StrategyFactoryStub();
        bodyStrategyFactoryStub = new StrategyFactoryStub();
        responseManipulator = proxyquire("../lib/ResponseManipulator", {"./Strategies/Factory/HeaderStrategyFactory": headerStrategyFactoryStub, "./Strategies/Factory/BodyStrategyFactory": bodyStrategyFactoryStub});
        responseManipulator.buildResponse(url, realResponse, modifiedResponse, rulesManagerStub);
    });

    describe('#buildResponse()', function() {
        var fakeRule;

        describe("when using 1 rule", function() {
            describe("when the urls do not match", function() {
                before(function() {
                    fakeRule = {
                        getUrl: function() {
                            return "www.abc.com"
                        }
                    };

                    fakeRules = [fakeRule];
                });

                it('should call the header/footer strategy with undefined rule', function() {
                    headerStrategyFactoryStub.assertWasCalledWithRule(true, undefined);
                    bodyStrategyFactoryStub.assertWasCalledWithRule(true, undefined);
                });
            });

            describe("when the urls do match", function() {
                before(function() {
                    fakeRule = {
                        getUrl: function() {
                            return "www.google.com"
                        }
                    };

                    fakeRules = [fakeRule];
                });

                it('should call the header/footer', function() {
                    headerStrategyFactoryStub.assertWasCalledWithRule(true, fakeRule);
                    bodyStrategyFactoryStub.assertWasCalledWithRule(true, fakeRule);
                });
            });
        });

        describe("when using 2 rules", function() {
            describe("when the urls do not match", function() {
                before(function() {
                    fakeRule = {
                        getUrl: function() {
                            return "www.abc.com"
                        }
                    };

                    fakeRules = [fakeRule, fakeRule];
                });

                it('should call the header/footer strategy with undefined rule', function() {
                    headerStrategyFactoryStub.assertWasCalledWithRule(true, undefined);
                    bodyStrategyFactoryStub.assertWasCalledWithRule(true, undefined);
                });
            });

            describe("when the urls do match", function() {
                before(function() {
                    fakeRule = {
                        getUrl: function() {
                            return "www.google.com"
                        }
                    };

                    fakeRules = [{
                        getUrl: function() {
                            return "www.test.com"
                        }
                    }, fakeRule];
                });

                it('should not call the header/footer', function() {
                    headerStrategyFactoryStub.assertWasCalledWithRule(true, fakeRule);
                    bodyStrategyFactoryStub.assertWasCalledWithRule(true, fakeRule);
                });
            });
        });
    });
});