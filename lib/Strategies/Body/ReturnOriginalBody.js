var winston = require('winston');

var ReturnOriginalBody = function(rules, realResponse) {
    this.rules = rules;
    this.realResponse = realResponse;
};

ReturnOriginalBody.prototype.process = function(modifiedResponse) {
    this.realResponse.on("data", function(chunk) {
        modifiedResponse.write(chunk);
    });

    this.realResponse.on("end", function() {
        modifiedResponse.end();
    });
};

module.exports = ReturnOriginalBody;

