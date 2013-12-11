var chai = require("chai");
var expect = chai.expect;
var ReturnOriginalHeaders = require("../../../lib/Strategies/Headers/ReturnOriginalHeaders");
var ReplaceHeaders = require("../../../lib/Strategies/Headers/ReplaceHeaders");
var headersStrategyFactory = require("../../../lib/Strategies/Factory/HeaderStrategyFactory");

describe('HeaderStrategyFactory', function(){
    var headerStrategy;
    var requestedUrl;
    var rule = {};
    var fakeRealResponse = {};

    describe('#getStrategy()', function() {
        beforeEach(function() {
            headerStrategy = headersStrategyFactory.getStrategy(requestedUrl, fakeRealResponse, rule);
        });

        describe("when rule is undefined", function () {
            before(function() {
                rule = undefined;
            });

            it("should return ReturnOriginalHeaders", function() {
                expect(headerStrategy).to.be.an.instanceof(ReturnOriginalHeaders);
            });

            after(function() {
                rule = {};
            });
        });

        describe("when using a requestedUrl with favicon.ico", function () {
            before(function() {
                requestedUrl = "www.google.com/favicon.ico";
            });

            describe("AND when requestedUrl does not resolve", function() {
                before(function() {
                    fakeRealResponse = undefined;
                });

                it("should return a ReplaceHeaders strategy", function() {
                    expect(headerStrategy).to.be.an.instanceof(ReplaceHeaders);
                    expect(headerStrategy.realResponse).to.not.exist;
                });
            });
        });

        describe("when using a requested url of www.google.com", function() {
            before(function() {
                requestedUrl = "www.google.com";
            });

            describe("when url in the configuration is not specified", function() {
                before(function() {
                    rule.getUrl = function() {
                        return undefined;
                    };
                });

                it('should return the ReturnOriginalBody strategy', function() {
                    expect(headerStrategy).to.be.an.instanceof(ReturnOriginalHeaders);
                });
            });

            describe("when the url in the configuration is different", function() {
                before(function() {
                    rule.getUrl = function() {
                        return "www.digg.com";
                    };
                });

                describe("AND when requestedUrl does resolve", function() {
                    before(function() {
                        fakeRealResponse = undefined;
                    });

                    describe("AND header rule have been specified", function() {
                        before(function() {
                            rule.getHeaders = function() {
                                return {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            };
                        });

                        it('should return the ReturnOriginalBody strategy', function() {
                            expect(headerStrategy).to.be.an.instanceof(ReturnOriginalHeaders);
                        });
                    });
                });
            });

            describe("when url in the configuration is specified", function() {
                before(function() {
                    rule.getUrl = function() {
                        return "www.google.com";
                    };
                });

                describe("AND when requestedUrl does not resolve", function() {
                    before(function() {
                        fakeRealResponse = undefined;
                    });

                    describe("AND header rule have not been specified", function() {
                        before(function() {
                            rule.getHeaders = function() {
                                return undefined;
                            };
                        });

                        it("should return the ReturnOriginalHeaders strategy", function() {
                            expect(headerStrategy).to.be.an.instanceof(ReturnOriginalHeaders);
                        });
                    });

                    describe("AND header rule have been specified", function() {
                        before(function() {
                            rule.getHeaders = function() {
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

                describe("AND when requestedUrl does resolve", function() {
                    before(function() {
                        fakeRealResponse = {};
                    });

                    afterEach(function() {
                        expect(headerStrategy.realResponse).to.exist;
                    });

                    describe("AND header rule have not been specified", function() {
                        before(function() {
                            rule.getHeaders = function() {
                                return undefined;
                            };
                        });

                        it("should return the ReturnOriginalHeaders strategy", function() {
                            expect(headerStrategy).to.be.an.instanceof(ReturnOriginalHeaders);
                        });
                    });

                    describe("AND header rule have been specified", function() {
                        before(function() {
                            rule.getHeaders = function() {
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
});