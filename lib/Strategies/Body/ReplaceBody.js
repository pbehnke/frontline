var winston = require('winston');

var ReplaceBody = function(rules, realResponse) {
    this.rules = rules;
    this.realResponse = realResponse;
};

ReplaceBody.prototype.process = function(modifiedResponse) {
    winston.info("Replacing body.");
    modifiedResponse.write(this.rules.getBody());
    modifiedResponse.end();
};

module.exports = ReplaceBody;

