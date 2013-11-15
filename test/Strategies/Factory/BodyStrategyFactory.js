var chai = require("chai");
var expect = chai.expect;
var bodyStrategyFactory = require("../../../lib/Strategies/Factory/BodyStrategyFactory");
var returnOriginalBody = require("../../../lib/Strategies/Body/ReturnOriginalBody");

describe('BodyStrategyFactory', function(){
    describe('#getStrategy()', function(){
        it('should return the ReturnOriginalBody strategy by default', function() {
            var bodyStrategy = bodyStrategyFactory.getStrategy();
            expect(bodyStrategy).to.be.an.instanceof(returnOriginalBody.constructor);
        });
    });
});