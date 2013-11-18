var chai = require("chai");
var expect = chai.expect;
var bodyStrategyFactory = require("../../../lib/Strategies/Factory/BodyStrategyFactory");
var ReturnOriginalBody = require("../../../lib/Strategies/Body/ReturnOriginalBody");
var ReplaceBody = require("../../../lib/Strategies/Body/ReplaceBody");

describe('BodyStrategyFactory', function(){
    var BodyStrategy;
    var bodyStrategy;
    var url;
    var rules = {};

    beforeEach(function setupDefaults() {
        url = "http://www.google.com";
        rules = {
            getUrl: function() {
                return "www.google.com"
            },
            getHeaders: function() {
                return {
                    "a": "b"
                }
            },
            getBodyLocation: function() {
                return "Body.html"
            }
        };
    });

    describe('#getStrategy()', function(){
        describe("when no url is specified", function() {
            beforeEach(function() {
                rules.getUrl = function() {
                    return undefined;
                };
            });

            describe("when no body is specified", function() {
                it('should return the ReturnOriginalBody strategy', function() {
                    BodyStrategy = bodyStrategyFactory.getStrategy(url, rules);
                    bodyStrategy = new BodyStrategy();
                    expect(bodyStrategy).to.be.an.instanceof(new ReturnOriginalBody().constructor);
                });
            });
        });

        describe("when url is specified", function() {
            describe("when no bodyLocation is specified", function() {
                before(function() {
                    rules.getBodyLocation = function() {
                        return undefined;
                    };
                });

                it('should return the ReturnOriginalBody strategy', function() {
                    expect(bodyStrategy).to.be.an.instanceof(new ReturnOriginalBody().constructor);
                });
            });

            describe("when bodyLocation is specified", function() {
                beforeEach(function() {
                    rules.getBodyLocation = function() {
                        return "abc";
                    };
                });

                it('should return the ReplaceBody strategy', function() {
                    BodyStrategy = bodyStrategyFactory.getStrategy(url, rules);
                    bodyStrategy = new BodyStrategy();
                    expect(bodyStrategy).to.be.an.instanceof(new ReplaceBody().constructor);
                });
            });
        });
    });
});