var winston = require('winston');

var ReplaceBody = function() {};

ReplaceBody.prototype.process = function(realResponse, modifiedResponse, _rules) {
    modifiedResponse.write(_rules.getBody());
    winston.log("Finished overwriting HTML body.")
    modifiedResponse.end();
};

module.exports = ReplaceBody;

