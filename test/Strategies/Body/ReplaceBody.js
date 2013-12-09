var chai = require("chai");
var expect = chai.expect;
var ReplaceBody = require("../../../lib/Strategies/Body/ReplaceBody");

describe('ReplaceBody', function(){
    var content;
    var replaceBody;
    var fakeRules = {};
    var fakeRealResponse = {};

    var MockModifiedResponse = function(expectedText) {
        return {
            endFunctionHasBeenCalled: false,
            write: function(chunk) {
                expect(chunk).to.equal(expectedText);
            },
            end: function() {
                this.endFunctionHasBeenCalled = true;
            }
        }
    };

    describe("#process()", function() {
        beforeEach(function() {
            replaceBody = new ReplaceBody(fakeRules, fakeRealResponse, content);
        });

        describe("when content is present", function() {
            before(function() {
                content = "Some content";
            });

            it("should write the content to the modifiedResponse", function() {
                var mockModifiedResponse = new MockModifiedResponse(content);
                replaceBody.process(mockModifiedResponse);
                expect(mockModifiedResponse.endFunctionHasBeenCalled).to.be.true;
            });
        });

        describe("when content is null", function() {
            before(function() {
                content = null;
            });

            it("should write the content to the modifiedResponse", function() {
                var mockModifiedResponse = new MockModifiedResponse(content);
                replaceBody.process(mockModifiedResponse);
                expect(mockModifiedResponse.endFunctionHasBeenCalled).to.be.true;
            });
        });
    });
});