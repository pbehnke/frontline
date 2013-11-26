var winston = require('winston');

var ReturnOriginalHeaders = function () {};

ReturnOriginalHeaders.prototype.process = function(realResponse, modifiedResponse) {
    modifiedResponse.writeHead(realResponse.statusCode, realResponse.headers);
};

module.exports = ReturnOriginalHeaders;

