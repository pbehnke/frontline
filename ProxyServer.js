"use strict";

var winston = require('winston');
var http = require('http');

var ProxyServer = function(port) {
    var self = this;
    self.port = port;
};

ProxyServer.prototype.start = function() {
    var self = this;
    winston.info("Proxy server started on " + self.port);

//    http.createServer(function (request, response) {
//        winston.info("Received request for: " + request.url);
//    //    forwardRequestAndProcessResponse(request, response, new TransparentProxy().process);
//    }).listen(proxyServerPort);
};

module.exports = ProxyServer;
