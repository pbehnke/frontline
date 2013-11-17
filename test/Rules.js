"use strict";

var Rules = require("../lib/Rules");
var chai = require("chai");
var expect = chai.expect;

describe('Rules', function() {
    var rulesJson = {};

    describe('#getUrl()', function() {
        describe("if no url has been specified", function() {
            before(function() {
                rulesJson.url = undefined;
            });

            it('should return undefined', function() {
                expect(new Rules(rulesJson).getUrl()).to.be.undefined;
            });
        });

        describe("if url has been specified", function() {
            before(function() {
                rulesJson.url = "www.google.com";
            });

            it('should return the url', function() {
                expect(new Rules(rulesJson).getUrl()).to.equal("www.google.com");
            });
        });
    });

    describe('#getHeaders()', function() {
        describe("if no headers have been specified", function() {
            before(function() {
                rulesJson.headers = undefined;
            });

            it('should return undefined', function() {
                expect(new Rules(rulesJson).getHeaders()).to.be.undefined;
            });
        });

        describe("if headers is an empty object", function() {
            before(function() {
                rulesJson.headers = {};
            });

            it('should return undefined', function() {
                expect(new Rules(rulesJson).getHeaders()).to.be.undefined;
            });
        });

        describe("if headers are present", function() {
            before(function() {
                rulesJson.headers = {"a": "b"};
            });

            it('should return headers', function() {
                expect(new Rules(rulesJson).getHeaders()).to.deep.equal({a: "b"})
            });
        });
    });
});