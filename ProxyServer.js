"use strict";

var winston = require('winston');
var http = require('http');
var ResponseManipulator = require('./ResponseManipulator');

var ProxyServer = function(port) {
    this.port = port;
};

ProxyServer.prototype.start = function() {
    winston.info("Proxy server started on " + this.port);

    http.createServer(function (request, modifiedResponse) {
        winston.info("Received request for: " + request.url);
        executeRequestAndReportResults(request.url, modifiedResponse);
    }).listen(this.port);
};

function executeRequestAndReportResults(url, modifiedResponse) {
    var realRequest = http.request(url, function(realResponse) {
        new ResponseManipulator().buildResponse(realResponse, modifiedResponse);
    });
    realRequest.end();
}

module.exports = ProxyServer;
