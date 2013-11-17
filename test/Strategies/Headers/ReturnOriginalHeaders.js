var chai = require("chai");
var expect = chai.expect;
var ReturnOriginalHeaders = require("../../../lib/Strategies/Headers/ReturnOriginalHeaders");

describe('ReplaceHeaders', function(){
    var fakeRealResponse;
    var mockModifiedResponse;

    before(function () {
        fakeRealResponse = {
            headers: [
                {"a": "b"}
            ],
            statusCode: 200
        };

        mockModifiedResponse = {
            setExpectedNumberOfHeaders: function(number) {
                this.expectedNumberOfHeaders = number;
            },
            writeHead: function verifyStatusCodeAndHeadersAreBeingSet(statusCode, headers) {
                expect(statusCode).to.equal(fakeRealResponse.statusCode);
                expect(headers).to.equal(fakeRealResponse.headers);
                expect(headers).to.have.length(this.expectedNumberOfHeaders);
            }
        };
    });

    describe('#process()', function(){
        it('should return 1 header if 1 header exists', function() {
            fakeRealResponse = {
                headers: [
                    {"a": "b"}
                ],
                statusCode: 200
            };

            mockModifiedResponse.setExpectedNumberOfHeaders(1);

            new ReturnOriginalHeaders().process(fakeRealResponse, mockModifiedResponse);
        });

        it('should return 2 headers if 2 headers exist', function() {
            fakeRealResponse = {
                headers: [
                    {"a": "b"},
                    {"c": "d"}
                ],
                statusCode: 200
            };

            mockModifiedResponse.setExpectedNumberOfHeaders(2);

            new ReturnOriginalHeaders().process(fakeRealResponse, mockModifiedResponse);
        });
    });
});