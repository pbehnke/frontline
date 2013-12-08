var winston = require('winston');

var ReplaceHeaders = function(rules, realResponse) {
    this.rules = rules;
    this.realResponse = realResponse;
};

ReplaceHeaders.prototype.process = function(modifiedResponse) {
    var headers = this.rules.getHeaders();
    winston.info("Replacing headers. Details: " + JSON.stringify(headers));
    modifiedResponse.writeHead(200, headers);
};

module.exports = ReplaceHeaders;