var chai = require("chai");
var expect = chai.expect;
var ReplaceUrls = require("../../../lib/Strategies/Body/ReplaceUrls");

describe('ReplaceUrls', function(){
    var mockRealResponse;
    var mockModifiedResponse;
    var fakeRules;

    before(function () {
        mockRealResponse = {
            on: function(event, callback) {
                if(event === "data") {
                    callback(this.body);
                }

                if(event === "end") {
                    mockModifiedResponse.end();
                }
            },
            setActualBody: function(body) {
                this.body = body;
            }
        };

        mockModifiedResponse = {
            endFunctionHasBeenCalled: false,
            write: function(chunk) {
                expect(chunk).to.equal(this.expectedBody);
            },
            end: function() {
                this.endFunctionHasBeenCalled = true;
            },
            setExpectedBody: function(expectedBody) {
                this.expectedBody = expectedBody;
            }
        };

        fakeRules = {
            getUrlReplacement: function() {
                return {
                    oldUrl: "www.digg.com",
                    newUrl: "www.reddit.com"
                };
            }
        };
    });

    describe('#process()', function(){
        describe("if no url rules are present", function() {
            before(function() {
                fakeRules.getUrlReplacement = function() {
                    return undefined;
                };

                mockRealResponse.setActualBody("www.digg.com");
                mockModifiedResponse.setExpectedBody("www.digg.com");
            });

            it("should return the original body", function() {
                new ReplaceUrls(fakeRules, mockRealResponse).process(mockModifiedResponse);
                expect(mockModifiedResponse.endFunctionHasBeenCalled).to.equal(true);
            });
        });

        describe("if urls are present", function() {
            before(function() {
                fakeRules.getUrlReplacement = function() {
                    return {
                        oldUrl: "www.digg.com",
                        newUrl: "www.reddit.com"
                    };
                };

                mockModifiedResponse.setExpectedBody("www.reddit.com");
            });

            describe("when there is only one url in the body", function() {
                before(function() {
                    mockRealResponse.setActualBody("www.digg.com");
                    mockModifiedResponse.setExpectedBody("www.reddit.com");
                });

                it("should change the url", function() {
                    new ReplaceUrls(fakeRules, mockRealResponse).process(mockModifiedResponse);
                    expect(mockModifiedResponse.endFunctionHasBeenCalled).to.equal(true);
                });
            });

            describe("when there are multiple urls in the body", function() {
                before(function() {
                    mockRealResponse.setActualBody("Hello www.digg.com This www.digg.com Is www.digg.com A www.digg.com Test");
                    mockModifiedResponse.setExpectedBody("Hello www.reddit.com This www.reddit.com Is www.reddit.com A www.reddit.com Test");
                });

                it("should change all of the urls", function() {
                    new ReplaceUrls(fakeRules, mockRealResponse).process(mockModifiedResponse);
                    expect(mockModifiedResponse.endFunctionHasBeenCalled).to.equal(true);
                });
            });
        });
    });
});