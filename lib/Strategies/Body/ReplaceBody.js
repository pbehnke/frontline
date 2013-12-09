var winston = require('winston');

var ReplaceBody = function(rules, realResponse, content) {
    this.rules = rules;
    this.realResponse = realResponse;
    this.content = content;
};

ReplaceBody.prototype.process = function(modifiedResponse) {
    winston.info("Replacing body.");
    modifiedResponse.write(this.content);
    modifiedResponse.end();
};

module.exports = ReplaceBody;

