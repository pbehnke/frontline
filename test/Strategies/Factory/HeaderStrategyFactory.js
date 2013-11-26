var chai = require("chai");
var expect = chai.expect;
var ReturnOriginalHeaders = require("../../../lib/Strategies/Headers/ReturnOriginalHeaders");
var ReplaceHeaders = require("../../../lib/Strategies/Headers/ReplaceHeaders");
var proxyquire = require("proxyquire");
var Rules = require("../../../lib/Rules/Rules");

describe('HeaderStrategyFactory', function(){
    var url = "http://www.google.com";

    var rules = new Rules({
        url: "www.google.com",
        headers: {
            a: "b"
        },
        body: "Test Content"
    });

    var rulesManagerStub = {
        getRules: function() {
            return rules;
        }
    };

    var headersStrategyFactory = proxyquire("../../../lib/Strategies/Factory/HeaderStrategyFactory", {"../../Rules/RulesManager": rulesManagerStub});

    describe('#getStrategy()', function(){
        describe("when headers are empty", function() {
            it('should return the ReturnOriginalHeaders', function() {
                var headerStrategy = headersStrategyFactory.getStrategy(url);
                expect(headerStrategy).to.be.an.instanceof(new ReturnOriginalHeaders().constructor);
            });
        });

        describe("when headers are not empty", function() {
            before(function() {
                rules.getHeaders = function() {
                    return {
                        a: "b"
                    }
                };
            });

            describe("when url matches", function () {
                it("should return the ReplaceHeaders strategy", function () {
                    var headerStrategy = headersStrategyFactory.getStrategy(url);
                    expect(headerStrategy).to.be.an.instanceof(new ReplaceHeaders().constructor);
                });
            });

            describe("when url does not match", function () {
                before(function() {
                    rules.getUrl = function() {
                        return "www.test.com";
                    };
                });

                it("should return the ReturnOriginalHeaders strategy", function () {
                    var headerStrategy = headersStrategyFactory.getStrategy(url);
                    expect(headerStrategy).to.be.an.instanceof(new ReturnOriginalHeaders().constructor);
                });
            });
        });
    });
});