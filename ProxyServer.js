"use strict";

var winston = require('winston');
var http = require('http');
var ResponseManipulator = require('./ResponseManipulator');

var ProxyServer = function(port) {
    var self = this;
    self.port = port;
};

ProxyServer.prototype.start = function() {
    var self = this;
    winston.info("Proxy server started on " + self.port);

    http.createServer(function (request, modifiableResponse) {
        winston.info("Received request for: " + request.url);
        executeRequestAndReportResults(request.url, modifiableResponse);
    }).listen(self.port);
};

function executeRequestAndReportResults(url, modifiableResponse) {
    var forwardedRequest = http.request(url, function(forwardedResponse) {
        modifiableResponse.writeHead(forwardedResponse.statusCode, {'Content-Type': 'text/plain'});
        modifiableResponse.end();
    });
    forwardedRequest.end();
}

module.exports = ProxyServer;
