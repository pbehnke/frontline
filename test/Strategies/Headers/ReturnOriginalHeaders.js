var chai = require("chai");
var expect = chai.expect;
var returnOriginalHeaders = require("../../../lib/Strategies/Headers/ReturnOriginalHeaders");

describe('ReturnOriginalHeaders', function(){
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
            writeHead: verifyStatusCodeAndHeadersAreBeingSet
        };

        function verifyStatusCodeAndHeadersAreBeingSet(statusCode, headers) {
            expect(statusCode).to.equal(fakeRealResponse.statusCode);
            expect(headers).to.equal(fakeRealResponse.headers);
        }
    });

    describe('#process()', function(){
        it('should return the original headers by default', function() {
            returnOriginalHeaders.process(fakeRealResponse, mockModifiedResponse);
        });
    });
});