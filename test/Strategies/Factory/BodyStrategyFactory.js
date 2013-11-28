var chai = require("chai");
var expect = chai.expect;
var ReturnOriginalBody = require("../../../lib/Strategies/Body/ReturnOriginalBody");
var ReplaceUrls = require("../../../lib/Strategies/Body/ReplaceUrls");
var ReplaceBody = require("../../../lib/Strategies/Body/ReplaceBody");
var proxyquire = require("proxyquire");
var Rules = require("../../../lib/Rules/Rules");

describe('BodyStrategyFactory', function(){
    var bodyStrategy;
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

    var bodyStrategyFactory = proxyquire("../../../lib/Strategies/Factory/BodyStrategyFactory", {"../../Rules/RulesManager": rulesManagerStub});

    describe('#getStrategy()', function(){
        describe("when no url is specified", function() {
            beforeEach(function() {
                rules.getUrl = function() {
                    return undefined;
                };

                bodyStrategy = bodyStrategyFactory.getStrategy(url);
            });

            describe("when no body is specified", function() {
                it('should return the ReturnOriginalBody strategy', function() {
                    expect(bodyStrategy).to.be.an.instanceof(new ReturnOriginalBody().constructor);
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
                    expect(bodyStrategy).to.be.an.instanceof(new ReturnOriginalBody().constructor);
                });

                describe("when replaceUrls are specified", function() {
                    before(function() {
                        rules.getUrlReplacement = function() {
                            return {
                                oldUrl: "www.digg.com",
                                newUrl: "www.reddit.com"
                            };
                        };

                        bodyStrategy = bodyStrategyFactory.getStrategy(url);
                    });

                    it('should return the ReplaceUrl strategy', function() {
                        expect(bodyStrategy).to.be.an.instanceof(new ReplaceUrls().constructor);
                    });
                });
            });

            describe("when body is specified", function() {
                beforeEach(function() {
                    rules.getBody = function() {
                        return "abc";
                    };

                    bodyStrategy = bodyStrategyFactory.getStrategy(url);
                });

                it('should return the ReplaceBody strategy', function() {
                    expect(bodyStrategy).to.be.an.instanceof(new ReplaceBody().constructor);
                });

                describe("when replaceUrls are specified", function() {
                    beforeEach(function() {
                        rules.getUrlReplacement = function() {
                            return {
                                oldUrl: "www.digg.com",
                                newUrl: "www.reddit.com"
                            };
                        };

                        bodyStrategy = bodyStrategyFactory.getStrategy(url);
                    });

                    it('should return the ReplaceBody strategy', function() {
                        expect(bodyStrategy).to.be.an.instanceof(new ReplaceBody().constructor);
                    });
                });
            });
        });
    });
});