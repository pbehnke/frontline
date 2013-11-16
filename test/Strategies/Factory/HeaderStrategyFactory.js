var chai = require("chai");
var expect = chai.expect;
var headersStrategyFactory = require("../../../lib/Strategies/Factory/HeaderStrategyFactory");
var ReturnOriginalHeaders = require("../../../lib/Strategies/Headers/ReturnOriginalHeaders");
var AddOrUpdateHeaders = require("../../../lib/Strategies/Headers/AddOrUpdateHeaders");

describe('HeadersStrategyFactory', function(){
    var fakeUrl;
    var fakeRules;

    before(function () {
        fakeUrl = "http://www.google.com";
    });

    describe('#getStrategy()', function(){
        before(function() {
            fakeRules = {
                url: "www.test.com",
                headers: {
                    seb: "test"
                }
            };
        });

        it('should return the AddOrUpdateHeaders when URL does not match', function() {
            var HeaderStrategy = headersStrategyFactory.getStrategy(fakeUrl, fakeRules);
            var headerStrategy = new HeaderStrategy();
            expect(headerStrategy).to.be.an.instanceof(new ReturnOriginalHeaders().constructor);
        });
    });

    describe('#getStrategy()', function(){
        before(function() {
            fakeRules = {
                url: "www.google.com",
                headers: {
                    seb: "test"
                }
            };
        });

        it('should return the AddOrUpdateHeaders when URL does match', function() {

            var HeaderStrategy = headersStrategyFactory.getStrategy(fakeUrl, fakeRules);
            var headerStrategy = new HeaderStrategy();
            expect(headerStrategy).to.be.an.instanceof(new AddOrUpdateHeaders().constructor);
        });
    });
});