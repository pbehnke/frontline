"use strict";

module.exports.ShouldBeCalled = function(shouldBeCalled, doneCallback, expectedErrorMessage) {
    return function(value) {
        if(!shouldBeCalled) throw new Error("This function was not expected to be called");
        if(expectedErrorMessage) {
            if(!value) throw new Error("Was expecting an error to be thrown, but an error was not thrown");
            if(value.message !== expectedErrorMessage) throw new Error("The error expected was not the same as the actual error thrown");
        }
        if(doneCallback) doneCallback();
    };
};