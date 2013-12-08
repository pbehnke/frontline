var winston = require('winston');

var ReturnOriginalHeaders = function (rules, realResponse) {
    this.rules = rules;
    this.realResponse = realResponse;
};

ReturnOriginalHeaders.prototype.process = function(modifiedResponse) {
    modifiedResponse.writeHead(this.realResponse.statusCode, this.realResponse.headers);
};

module.exports = ReturnOriginalHeaders;

