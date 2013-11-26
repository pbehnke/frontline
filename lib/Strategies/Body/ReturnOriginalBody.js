var winston = require('winston');

var ReturnOriginalBody = function() {};

ReturnOriginalBody.prototype.process = function(realResponse, modifiedResponse) {
    realResponse.on("data", function(chunk) {
        modifiedResponse.write(chunk);
    });

    realResponse.on("end", function() {
        modifiedResponse.end();
    });
};

module.exports = ReturnOriginalBody;

