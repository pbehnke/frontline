var winston = require('winston');

var ReplaceHeaders = function(rules, realResponse, headers) {
    this.rules = rules;
    this.realResponse = realResponse;
    this.headers = headers;
};

ReplaceHeaders.prototype.process = function(modifiedResponse) {
    winston.info("Replacing headers. Details: " + JSON.stringify(this.headers));
    modifiedResponse.writeHead(200, this.headers);
};

module.exports = ReplaceHeaders;