var chai = require("chai");
var expect = chai.expect;
var ReplaceBody = require("../../../lib/Strategies/Body/ReplaceBody");

describe('ReplaceBody', function(){
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
});