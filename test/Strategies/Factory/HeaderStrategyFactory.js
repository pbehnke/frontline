var chai = require("chai");
var expect = chai.expect;
var ReturnOriginalHeaders = require("../../../lib/Strategies/Headers/ReturnOriginalHeaders");
var ReplaceHeaders = require("../../../lib/Strategies/Headers/ReplaceHeaders");
var proxyquire = require("proxyquire");
var Rules = require("../../../lib/Rules/Rules");

describe('HeaderStrategyFactory', function(){
    var headerStrategy;
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

    var fakeRealResponse = {};

    var headersStrategyFactory = proxyquire("../../../lib/Strategies/Factory/HeaderStrategyFactory", {"../../Rules/RulesManager": rulesManagerStub});

    describe('#getStrategy()', function() {
        beforeEach(function() {
            headerStrategy = headersStrategyFactory.getStrategy(url, fakeRealResponse);
        });

        describe("when no url is specified", function() {
            before(function() {
                rules.getUrl = function() {
                    return undefined;
                };
            });

            it('should return the ReturnOriginalBody strategy', function() {
                expect(headerStrategy).to.be.an.instanceof(ReturnOriginalHeaders);
            });
        });

        describe("when url is specified", function() {
            before(function() {
                rules.getUrl = function() {
                    return "www.google.com";
                };
            });

            describe("AND when url does not resolve", function() {
                before(function() {
                    fakeRealResponse = undefined;
                });

                describe("AND header rules have not been specified", function() {
                    before(function() {
                        rules.getHeaders = function() {
                            return undefined;
                        };
                    });

                    it("should return the ReturnOriginalHeaders strategy", function() {
                        expect(headerStrategy).to.be.an.instanceof(ReturnOriginalHeaders);
                    });
                });

                describe("AND header rules have been specified", function() {
                    before(function() {
                        rules.getHeaders = function() {
                            return {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        };
                    });

                    it("should return the ReplaceHeaders strategy", function() {
                        expect(headerStrategy).to.be.an.instanceof(ReplaceHeaders);
                    });
                });
            });

            describe("AND when url does resolve", function() {
                before(function() {
                    fakeRealResponse = {};
                });

                describe("AND header rules have not been specified", function() {
                    before(function() {
                        rules.getHeaders = function() {
                            return undefined;
                        };
                    });

                    it("should return the ReturnOriginalHeaders strategy", function() {
                        expect(headerStrategy).to.be.an.instanceof(ReturnOriginalHeaders);
                    });
                });

                describe("AND header rules have been specified", function() {
                    before(function() {
                        rules.getHeaders = function() {
                            return {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        };
                    });

                    it("should return the ReplaceHeaders strategy", function() {
                        expect(headerStrategy).to.be.an.instanceof(ReplaceHeaders);
                    });
                });
            });
        });
    });
});