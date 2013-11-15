var chai = require("chai");
var expect = chai.expect;
var headersStrategyFactory = require("../../../lib/Strategies/Factory/HeaderStrategyFactory");
var returnOriginalHeaders = require("../../../lib/Strategies/Headers/ReturnOriginalHeaders");

describe('HeadersStrategyFactory', function(){
    describe('#getStrategy()', function(){
        it('should return the ReturnOriginalHeaders strategy by default', function() {
            var bodyStrategy = headersStrategyFactory.getStrategy();
            expect(bodyStrategy).to.be.an.instanceof(returnOriginalHeaders.constructor);
        });
    });
});