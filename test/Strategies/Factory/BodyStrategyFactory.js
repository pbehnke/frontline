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

    var fakeRealResponse = {};

    var bodyStrategyFactory = proxyquire("../../../lib/Strategies/Factory/BodyStrategyFactory", {"../../Rules/RulesManager": rulesManagerStub});

    describe('#getStrategy()', function(){
        beforeEach(function() {
            bodyStrategy = bodyStrategyFactory.getStrategy(url, fakeRealResponse);
        });

        describe("when no url is specified", function() {
            before(function() {
                rules.getUrl = function() {
                    return undefined;
                };

            });

            describe("AND when no body is specified", function() {
                it('should return the ReturnOriginalBody strategy', function() {
                    expect(bodyStrategy).to.be.an.instanceof(ReturnOriginalBody);
                });
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
                    fakeRealResponse = null;
                });

                describe("AND when no body is specified", function() {
                    before(function() {
                        rules.getBody = function() {
                            return undefined;
                        };
                    });

                    it('should return the ReturnOriginalBody strategy', function() {
                        expect(bodyStrategy).to.be.an.instanceof(ReturnOriginalBody);
                    });

                    describe("AND when replaceUrls are specified", function() {
                        before(function() {
                            rules.getUrlReplacement = function() {
                                return {
                                    oldUrl: "www.digg.com",
                                    newUrl: "www.reddit.com"
                                };
                            };
                        });

                        it('should return the ReturnOriginalBody strategy', function() {
                            expect(bodyStrategy).to.be.an.instanceof(ReturnOriginalBody);
                        });
                    });
                });

                describe("when body is specified", function() {
                    before(function() {
                        rules.getBody = function() {
                            return "abc";
                        };
                    });

                    it('should return the ReplaceBody strategy', function() {
                        expect(bodyStrategy).to.be.an.instanceof(ReplaceBody);
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

                        it('should return the ReplaceBody strategy', function() {
                            expect(bodyStrategy).to.be.an.instanceof(ReplaceBody);
                        });
                    });
                });
            });

            describe("AND when url does resolve", function() {
                before(function() {
                    fakeRealResponse = {};
                });

                describe("AND when no body is specified", function() {
                    before(function() {
                        rules.getBody = function() {
                            return undefined;
                        };
                    });

                    describe("AND when replaceUrls are specified", function() {
                        before(function() {
                            rules.getUrlReplacement = function() {
                                return {
                                    oldUrl: "www.digg.com",
                                    newUrl: "www.reddit.com"
                                };
                            };
                        });

                        it('should return the ReplaceUrl strategy', function() {
                            expect(bodyStrategy).to.be.an.instanceof(ReplaceUrls);
                        });
                    });

                    describe("AND when replaceUrls are not specified", function() {
                        before(function() {
                            rules.getUrlReplacement = function() {
                                return undefined;
                            };
                        });

                        it('should return the ReplaceUrl strategy', function() {
                            expect(bodyStrategy).to.be.an.instanceof(ReturnOriginalBody);
                        });
                    });
                });

                describe("AND when body is specified", function() {
                    before(function() {
                        rules.getBody = function() {
                            return "abc";
                        };
                    });

                    describe("AND when replaceUrls are specified", function() {
                        before(function() {
                            rules.getUrlReplacement = function() {
                                return {
                                    oldUrl: "www.digg.com",
                                    newUrl: "www.reddit.com"
                                };
                            };
                        });

                        it('should return the ReplaceBody strategy', function() {
                            expect(bodyStrategy).to.be.an.instanceof(ReplaceBody);
                        });
                    });

                    describe("AND when replaceUrls are not specified", function() {
                        before(function() {
                            rules.getUrlReplacement = function() {
                                return undefined;
                            };
                        });

                        it('should return the ReplaceBody strategy', function() {
                            expect(bodyStrategy).to.be.an.instanceof(ReplaceBody);
                        });
                    });
                });
            });
        });
    });
});