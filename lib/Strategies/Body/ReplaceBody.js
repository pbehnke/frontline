var winston = require('winston');

var ReplaceBody = function(rules) {
    this.rules = rules;
};

ReplaceBody.prototype.process = function(realResponse, modifiedResponse) {
    winston.info("Replacing body.");
    modifiedResponse.write(this.rules.getBody());
    modifiedResponse.end();
};

module.exports = ReplaceBody;

