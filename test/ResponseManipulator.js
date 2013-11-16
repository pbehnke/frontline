"use strict";

var proxyquire = require("proxyquire");

describe('ResponseManipulator', function(){
    var url;
    var realResponse;
    var modifiedResponse;
    var rules;
    var responseManipulator;

    before(function () {
        url = "http://www.google.com";

        realResponse = {};
        modifiedResponse = {};
        rules = {};

        var headerStrategyFactoryStub = {
            getStrategy: function() {
                return function(url, rules) {
                    return {
                        process: function(realResponse, modifiedResponse, rules) {
                            // Do nothing
                        }
                    }
                }
            }
        };

        var bodyStrategyFactoryStub = {
            getStrategy:  function() {
                return {
                    process: function(realResponse, modifiedResponse) {
                        // Do nothing
                    }
                }
            }
        };

        responseManipulator = proxyquire("../lib/ResponseManipulator", {"./Strategies/Factory/HeaderStrategyFactory": headerStrategyFactoryStub, "./Strategies/Factory/BodyStrategyFactory": bodyStrategyFactoryStub});
    });

    describe('#buildResponse()', function(){
        it('should call HeaderStrategy', function() {
            responseManipulator.buildResponse(url, realResponse, modifiedResponse);
        });
    });
});