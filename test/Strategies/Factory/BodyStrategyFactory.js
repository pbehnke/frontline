var chai = require("chai");
var expect = chai.expect;
var ReturnOriginalBody = require("../../../lib/Strategies/Body/ReturnOriginalBody");
var ReplaceUrls = require("../../../lib/Strategies/Body/ReplaceUrls");
var ReplaceBody = require("../../../lib/Strategies/Body/ReplaceBody");
var proxyquire = require("proxyquire");
var Rules = require("../../../lib/Rules/Rules");

describe('BodyStrategyFactory', function(){
    var url = "http://www.google.com";

    var rules = new Rules({
        url: "www.google.com",
        headers: {
            a: "b"
        },
        body: "Test Content",
        replaceUrls: {
            oldUrl: "www.digg.com",
            newUrl: "www.reddit.com"
        }
    });

    var rulesManagerStub = {
        getRules: function() {
            return rules;
        }
    };

    var CheckFailureCondition = function(expected) {
        return function() {
           if(!expected) throw new Error("Did not expect an exception");
        }
    };

    var bodyStrategyFactory = proxyquire("../../../lib/Strategies/Factory/BodyStrategyFactory", {"../../Rules/RulesManager": rulesManagerStub});

    describe('#getStrategy()', function(){
//        describe("when url does not resolve", function() {
//            beforeEach(function() {
//                rules.getUrl = function() {
//                    return "somethingfake.com";
//                };
//
//                bodyStrategyFactory.getStrategy(url).then();
//            });
//
//            it('should return the ReturnOriginalBody strategy', function() {
//            });
//        });

        describe("when no url is specified", function() {
            beforeEach(function() {
                rules.getUrl = function() {
                    return undefined;
                };
            });

            describe("when no body is specified", function() {
                it('should return the ReturnOriginalBody strategy', function() {
                    bodyStrategyFactory.getStrategy(url).then(function(bodyStrategy) {
                        expect(bodyStrategy).to.be.an.instanceof(new ReturnOriginalBody().constructor);
                    }, new CheckFailureCondition(false));
                });
            });
        });

        describe("when url is specified", function() {
            before(function() {
                rules.getUrl = function() {
                    return "www.google.com";
                };
            });

            describe("when no body is specified", function() {
                before(function() {
                    rules.getBody = function() {
                        return undefined;
                    };
                });

                it('should return the ReturnOriginalBody strategy', function() {
                    bodyStrategyFactory.getStrategy(url).then(function(bodyStrategy) {
                        expect(bodyStrategy).to.be.an.instanceof(new ReturnOriginalBody().constructor);
                    }, new CheckFailureCondition(false));
                });

                describe("when replaceUrls are specified", function() {
                    before(function() {
                        rules.getUrlReplacement = function() {
                            return {
                                oldUrl: "www.digg.com",
                                newUrl: "www.reddit.com"
                            };
                        };
                    });

                    it('should return the ReplaceUrl strategy', function() {
                        bodyStrategyFactory.getStrategy(url).then(function(bodyStrategy) {
                            expect(bodyStrategy).to.be.an.instanceof(new ReplaceUrls().constructor);
                        }, new CheckFailureCondition(false));
                    });
                });
            });

            describe("when body is specified", function() {
                beforeEach(function() {
                    rules.getBody = function() {
                        return "abc";
                    };
                });

                describe("when replaceUrls are specified", function() {
                    beforeEach(function() {
                        rules.getUrlReplacement = function() {
                            return {
                                oldUrl: "www.digg.com",
                                newUrl: "www.reddit.com"
                            };
                        };
                    });

                    it('should return the ReplaceBody strategy', function() {
                        bodyStrategyFactory.getStrategy(url).then(function(bodyStrategy) {
                            expect(bodyStrategy).to.be.an.instanceof(new ReplaceBody().constructor);
                        }, new CheckFailureCondition(false));
                    });
                });
            });
        });
    });
});