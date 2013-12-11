"use strict";

var Rule = require("../../lib/Rules/Rule");
var chai = require("chai");
var expect = chai.expect;
var ShouldBeCalled = require("../TestUtils").ShouldBeCalled;

describe('Rule', function() {
    var rule;
    var rulesJson = {};

    beforeEach(function() {
        rule = new Rule();
    });

    describe("#initializeFromJson", function() {
        describe("if rules are undefined", function() {
            before(function() {
                rulesJson = undefined;
            });

            it("should return an error", function(done) {
                rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(false), new ShouldBeCalled(true, done, "JSON was not provided."));
            });
        });

        describe("if rules are null", function() {
            before(function() {
                rulesJson = null;
            });

            it("should return an error", function(done) {
                rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(false), new ShouldBeCalled(true, done, "JSON was not provided."));
            });
        });

        describe("if rules are empty", function() {
            before(function() {
                rulesJson = {};
            });

            it("should return an error", function(done) {
                rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(false), new ShouldBeCalled(true, done, "URL was not provided."));
            });
        });

        describe("if rules are present", function() {
            describe("AND rules are missing a URL", function() {
                before(function() {
                    rulesJson.url = undefined;
                });

                it("should return an error", function(done) {
                    rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(false), new ShouldBeCalled(true, done, "URL was not provided."));
                });
            });

            describe("AND rules include a valid URL", function() {
                before(function() {
                    rulesJson.url = "http://www.google.com";
                });

                describe("AND if rules body is missing", function() {
                    before(function() {
                        rulesJson.body = null;
                    });

                    describe("AND rules headers are missing", function() {
                        before(function() {
                            rulesJson.headers = null;
                        });

                        it("should return an error", function(done) {
                            rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(false), new ShouldBeCalled(true, done, "Either headers or a body must be present."));
                        });
                    });

                    describe("AND rules headers are present", function() {
                        before(function() {
                            rulesJson.headers = {
                                "Content-Type": "application/json"
                            };
                        });

                        it("should not return an error", function(done) {
                            rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(true, done), new ShouldBeCalled(false));
                        });
                    });
                });
            });

            describe("AND rules include an invalid URL", function() {
                before(function() {
                    rulesJson.url = "blah";
                });

                it("should return an error", function(done) {
                    rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(false), new ShouldBeCalled(true, done, "Invalid URL"));
                });
            });
        });
    });

    describe("if a correct rules json has been specified", function() {
        var expectedUrl = "sebtest.com/abc";

        var expectedHeaders = {
            "Content-Type": "application/json"
        };

        var expectedBody = {
            "a": "b"
        };

        var expectedUrlsToReplace = {
            "oldUrl": "replacethisurl.com",
            "newUrl": "withthisurl.com"
        };

        before(function() {
            rulesJson = {
                "url": expectedUrl,
                "headers": expectedHeaders,
                "body": expectedBody,
                "replaceUrls": expectedUrlsToReplace
            };
        });

        describe('#getUrl()', function() {
            it('should return the url', function(done) {
                rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(true), new ShouldBeCalled(false)).then(function() {
                    expect(rule.getUrl()).to.equal(expectedUrl);
                    done();
                });
            });
        });

        describe('#getHeaders()', function() {
            it('should return the headers', function(done) {
                rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(true), new ShouldBeCalled(false)).then(function() {
                    expect(rule.getHeaders()).to.deep.equal(expectedHeaders);
                    done();
                });
            });
        });

        describe('#getBody()', function() {
            it('should return the body', function(done) {
                rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(true), new ShouldBeCalled(false)).then(function() {
                    expect(rule.getBody()).to.deep.equal(expectedBody);
                    done();
                });
            });
        });

        describe('#getUrlReplacement()', function() {
            it('should return the urls to replace', function(done) {
                rule.initializeFromJson(rulesJson).then(new ShouldBeCalled(true), new ShouldBeCalled(false)).then(function() {
                    expect(rule.getUrlReplacement()).to.deep.equal(expectedUrlsToReplace);
                    done();
                });
            });
        });
    });
});