"use strict";

var winston = require('winston');

module.exports = function ProxyServer(port) {
    var running = false;

    this.start = function() {
        winston.info("Proxy server started on " + port);

//        http.createServer(function (request, response) {
////    winston.info("Received request for: " + request.url);
////    forwardRequestAndProcessResponse(request, response, new TransparentProxy().process);
//        }).listen(proxyServerPort);
    };
};