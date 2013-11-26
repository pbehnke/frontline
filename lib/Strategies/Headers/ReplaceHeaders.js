var winston = require('winston');

var ReplaceHeaders = function() {};

ReplaceHeaders.prototype.process = function(realResponse, modifiedResponse, rules) {
    var headers = rules.getHeaders();
    winston.info("Replacing headers. Details: " + JSON.stringify(headers));
    modifiedResponse.writeHead(realResponse.statusCode, headers);
};

module.exports = ReplaceHeaders;