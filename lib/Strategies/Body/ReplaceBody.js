var winston = require('winston');

var ReplaceBody = function(rules) {
    this.rules = rules;
};

ReplaceBody.prototype.process = function(modifiedResponse) {
    winston.info("Replacing body.");
    modifiedResponse.write(this.rules.getBody());
    modifiedResponse.end();
};

module.exports = ReplaceBody;

