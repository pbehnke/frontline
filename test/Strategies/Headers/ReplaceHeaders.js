var chai = require("chai");
var expect = chai.expect;
var ReplaceHeaders = require("../../../lib/Strategies/Headers/ReplaceHeaders");

describe('ReplaceHeaders', function(){
    var fakeRules = {};
    var fakeRealResponse = {};
    var mockModifiedResponse;

    describe('#process()', function(){
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

        describe("if no configuration exists for header", function() {
            before(function() {
                mockModifiedResponse.setExpectedHeaders(null);
            });

            it('should return no headers', function() {
                new ReplaceHeaders(fakeRules, fakeRealResponse, null).process(mockModifiedResponse);
            });
        });

        describe("if configuration exists for header", function() {
            before(function() {
                mockModifiedResponse.setExpectedHeaders({seb: "test"});
            });

            it('should return headers', function() {
                new ReplaceHeaders(fakeRules, fakeRealResponse, {seb: "test"}).process(mockModifiedResponse);
            });
        });
    });
});