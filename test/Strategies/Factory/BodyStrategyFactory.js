var chai = require("chai");
var expect = chai.expect;
var ReturnOriginalBody = require("../../../lib/Strategies/Body/ReturnOriginalBody");
var ReplaceUrls = require("../../../lib/Strategies/Body/ReplaceUrls");
var ReplaceBody = require("../../../lib/Strategies/Body/ReplaceBody");
var proxyquire = require("proxyquire");
var Rules = require("../../../lib/Rules/Rules");

describe('BodyStrategyFactory', function(){
    var bodyStrategy;

    var requestedUrl;
    var rules = {};
    var fakeRealResponse = {};

    var rulesManagerStub = {
        getRules: function() {
            return rules;
        }
    };

    var bodyStrategyFactory = proxyquire("../../../lib/Strategies/Factory/BodyStrategyFactory", {"../../Rules/RulesManager": rulesManagerStub});

    describe('#getStrategy()', function(){
        beforeEach(function() {
            bodyStrategy = bodyStrategyFactory.getStrategy(requestedUrl, fakeRealResponse);
        });

        describe("when using a requestedUrl with favicon.ico", function () {
            before(function() {
                requestedUrl = "www.google.com/favicon.ico";
            });

            describe("AND when requestedUrl does not resolve", function() {
                before(function() {
                    fakeRealResponse = undefined;
                });

                it("should return a ReplaceBody strategy", function() {
                    expect(bodyStrategy).to.be.an.instanceof(ReplaceBody);
                    expect(bodyStrategy.realResponse).to.not.exist;
                });
            });
        });

        describe("when using a requested url of www.google.com", function() {
            before(function() {
                requestedUrl = "www.google.com";
            });

            describe("when no url in the configuration is specified", function() {
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

            describe("when a different url in the configuraiton is specified", function() {
                before(function() {
                    rules.getUrl = function() {
                        return "www.digg.com";
                    };
                });

                describe("AND the requestedUrl resolves", function() {
                    before(function() {
                        fakeRealResponse = {};
                    });

                    afterEach(function() {
                        expect(bodyStrategy.realResponse).to.exist;
                    });

                    describe("AND when a body is specified", function() {
                        before(function() {
                            rules.getBody = function() {
                                return "Hello World";
                            };
                        });

                        it('should return the ReturnOriginalBody strategy', function() {
                            expect(bodyStrategy).to.be.an.instanceof(ReturnOriginalBody);
                        });
                    });
                });
            });

            describe("when url in the configuration is specified", function() {
                before(function() {
                    rules.getUrl = function() {
                        return "www.google.com";
                    };
                });

                describe("AND when requestedUrl does not resolve", function() {
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

                    describe("when body is not JSON", function() {
                        var content = "abc";

                        before(function() {
                            rules.getBody = function() {
                                return content;
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
                                expect(bodyStrategy.content).to.equal(content);
                            });
                        });
                    });

                    describe("when body is JSON", function() {
                        var content = {
                            a: "b"
                        };

                        before(function() {
                            rules.getBody = function() {
                                return content;
                            };
                        });

                        it('should return the ReplaceBody strategy', function() {
                            expect(bodyStrategy).to.be.an.instanceof(ReplaceBody);
                            expect(bodyStrategy.content).to.equal(JSON.stringify(content));
                        });
                    });
                });

                describe("AND when requestedUrl does resolve", function() {
                    before(function() {
                        fakeRealResponse = {};
                    });

                    afterEach(function() {
                        expect(bodyStrategy.realResponse).to.exist;
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
});