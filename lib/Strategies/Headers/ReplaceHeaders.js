var winston = require('winston');

var ReplaceHeaders = function() {};

ReplaceHeaders.prototype.process = function(realResponse, modifiedResponse, rules) {
    winston.info("Adding or updating headers. Details: " + JSON.stringify(rules.headers));
    modifiedResponse.writeHead(realResponse.statusCode, rules.headers);
};

module.exports = ReplaceHeaders;