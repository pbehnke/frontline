var winston = require('winston');

module.exports.process = function(realResponse, modifiedResponse) {
    realResponse.on("data", function(chunk) {
        modifiedResponse.write(chunk);
    });

    realResponse.on("end", function() {
        winston.log("Finished copying HTML body.")
        modifiedResponse.end();
    });
};

