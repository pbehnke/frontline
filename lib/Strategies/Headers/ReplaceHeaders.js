var winston = require('winston');

var ReplaceHeaders = function(rules) {
    this.rules = rules;
};

ReplaceHeaders.prototype.process = function(realResponse, modifiedResponse) {
    var headers = this.rules.getHeaders();
    winston.info("Replacing headers. Details: " + JSON.stringify(headers));
    modifiedResponse.writeHead(realResponse.statusCode, headers);
};

module.exports = ReplaceHeaders;