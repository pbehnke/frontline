var chai = require("chai");
var expect = chai.expect;
var ReplaceHeaders = require("../../../lib/Strategies/Headers/ReplaceHeaders");

describe('ReplaceHeaders', function(){
    var fakeRealResponse;
    var fakeRules;
    var mockModifiedResponse;

    before(function () {
        fakeRealResponse = {
            headers: [
                {"a": "b"}
            ],
            statusCode: 200
        };

        mockModifiedResponse = {
            setExpectedHeaders: function(expectedHeaders) {
                this.expectedHeaders = expectedHeaders;
            },
            writeHead: function verifyStatusCodeAndHeadersAreBeingSet(statusCode, headers) {
                expect(statusCode).to.equal(fakeRealResponse.statusCode);
                expect(headers).to.deep.equal(this.expectedHeaders);
            }
        };
    });

    describe('#process()', function(){
        describe("if no configuration exists for header", function() {
            before(function() {
                fakeRules = {};

                mockModifiedResponse.setExpectedHeaders(undefined);
            });

            it('should return no headers', function() {
                new ReplaceHeaders().process(fakeRealResponse, mockModifiedResponse, fakeRules);
            });
        });

        describe("if configuration exists for header", function() {
            before(function() {
                fakeRules = {
                    headers: {
                        seb: "test"
                    }
                };

                mockModifiedResponse.setExpectedHeaders({seb: "test"});
            });

            it('should return headers', function() {
                new ReplaceHeaders().process(fakeRealResponse, mockModifiedResponse, fakeRules);
            });
        });
    });
});