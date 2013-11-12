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

    http.createServer(function (request, modifiedResponse) {
        winston.info("Received request for: " + request.url);
        executeRequestAndReportResults(request.url, modifiedResponse);
    }).listen(self.port);
};

function executeRequestAndReportResults(url, modifiedResponse) {
    var realRequest = http.request(url, function(realResponse) {
        new ResponseManipulator().buildResponse(realResponse, modifiedResponse);
    });
    realRequest.end();
}

module.exports = ProxyServer;
