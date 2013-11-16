var winston = require('winston');

var ReturnOriginalHeaders = function () {};

ReturnOriginalHeaders.prototype.process = function(realResponse, modifiedResponse) {
    winston.info("Transparently setting headers. Details: " + JSON.stringify(realResponse.headers));
    modifiedResponse.writeHead(realResponse.statusCode, realResponse.headers);
};

module.exports = ReturnOriginalHeaders;

