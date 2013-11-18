var chai = require("chai");
var expect = chai.expect;
var ReturnOriginalBody = require("../../../lib/Strategies/Body/ReturnOriginalBody");

describe('ReturnOriginalBody', function(){
    var mockRealResponse;
    var mockModifiedResponse;

    before(function () {
        mockRealResponse = {
            on: function(event, callback) {
                if(event === "data") {
                    callback("Some text");
                }

                if(event === "end") {
                    mockModifiedResponse.end();
                }
            }
        };

        mockModifiedResponse = {
            endFunctionHasBeenCalled: false,
            write: function(chunk) {
                expect(chunk).to.equal("Some text");
            },
            end: function() {
                this.endFunctionHasBeenCalled = true;
            }
        };
    });

    describe('#process()', function(){
        it('should forward chunked data', function() {
            new ReturnOriginalBody().process(mockRealResponse, mockModifiedResponse);
            expect(mockModifiedResponse.endFunctionHasBeenCalled).to.equal(true);
        });
    });
});