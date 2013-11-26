var winston = require('winston');

var ReplaceBody = function() {};

ReplaceBody.prototype.process = function(realResponse, modifiedResponse, _rules) {
    winston.info("Replacing body.");
    modifiedResponse.write(_rules.getBody());
    modifiedResponse.end();
};

module.exports = ReplaceBody;

