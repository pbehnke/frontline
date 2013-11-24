var chai = require("chai");
var expect = chai.expect;
var headersStrategyFactory = require("../../../lib/Strategies/Factory/HeaderStrategyFactory");
var ReturnOriginalHeaders = require("../../../lib/Strategies/Headers/ReturnOriginalHeaders");
var ReplaceHeaders = require("../../../lib/Strategies/Headers/ReplaceHeaders");

describe('HeaderStrategyFactory', function(){
    var fakeUrl;
    var fakeRules;

    before(function () {
        fakeUrl = "http://www.google.com";

        fakeRules = {
            getUrl: function() {
                return "www.google.com";
            },
            getHeaders: function() {
                return undefined;
            }
        };
    });

    describe('#getStrategy()', function(){
        describe("when headers are empty", function() {
            it('should return the ReturnOriginalHeaders', function() {
                var headerStrategy = headersStrategyFactory.getStrategy(fakeUrl, fakeRules);
                expect(headerStrategy).to.be.an.instanceof(new ReturnOriginalHeaders().constructor);
            });
        });

        describe("when headers are not empty", function() {
            before(function() {
                fakeRules.getHeaders = function() {
                    return {
                        a: "b"
                    }
                };
            });

            describe("when url matches", function () {
                it("should return the ReplaceHeaders strategy", function () {
                    var headerStrategy = headersStrategyFactory.getStrategy(fakeUrl, fakeRules);
                    expect(headerStrategy).to.be.an.instanceof(new ReplaceHeaders().constructor);
                });
            });

            describe("when url does not match", function () {
                before(function() {
                    fakeRules.getUrl = function() {
                        return "www.test.com";
                    };
                });

                it("should return the ReturnOriginalHeaders strategy", function () {
                    var headerStrategy = headersStrategyFactory.getStrategy(fakeUrl, fakeRules);
                    expect(headerStrategy).to.be.an.instanceof(new ReturnOriginalHeaders().constructor);
                });
            });
        });
    });
});