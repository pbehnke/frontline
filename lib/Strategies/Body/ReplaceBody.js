var winston = require('winston');

var ReplaceBody = function() {};

ReplaceBody.prototype.process = function(realResponse, modifiedResponse) {
    modifiedResponse.write("Hello World");
    winston.log("Finished overwriting HTML body.")
    modifiedResponse.end();
};

module.exports = ReplaceBody;

