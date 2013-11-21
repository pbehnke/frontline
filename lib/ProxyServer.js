"use strict";

var winston = require('winston');
var http = require('http');
var responseManipulator = require('./ResponseManipulator');
var rulesEngine = require('./RulesEngine/RulesEngine');

var serverIsRunning = false;

var ProxyServer = function(port) {
    this.port = port;
};

ProxyServer.prototype.start = function() {
    var self = this;
    winston.info("Proxy server started on " + self.port);
    rulesEngine.onRulesRead(tryToCreateServer);
    rulesEngine.buildRules();
};

function tryToCreateServer() {
    if(serverIsRunning) return;
    serverIsRunning = true;
//    createServer();
}

function createServer() {
    http.createServer(function (request, modifiedResponse) {
        winston.info("Received request for: " + request.url);

        var realRequest = http.request(request.url, function(realResponse) {
            responseManipulator.buildResponse(request.url, realResponse, modifiedResponse);
        });

        realRequest.end();

    }).listen(this.port);
}

module.exports = ProxyServer;
