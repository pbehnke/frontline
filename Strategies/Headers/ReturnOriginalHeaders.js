var winston = require('winston');

module.exports.process = function(realResponse, modifiedResponse) {
    winston.info("Transparently setting headers. Details: " + JSON.stringify(realResponse.headers));
    modifiedResponse.writeHead(realResponse.statusCode, realResponse.headers);
    modifiedResponse.end();
};

