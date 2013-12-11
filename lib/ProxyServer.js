"use strict";

var winston = require('winston');
var http = require('http');
var responseManipulator = require('./ResponseManipulator');
var rulesManager = require('./Rules/RulesManager');

var serverIsRunning = false;

var ProxyServer = function(port, rulesPath) {
    this.port = port;
    this.rulesPath = rulesPath;
};

ProxyServer.prototype.start = function() {
    var self = this;
    rulesManager.onRulesRead(function() {
        tryToCreateServer(self.port);
    });
    rulesManager.buildRules(this.rulesPath);
};

function tryToCreateServer(port) {
    if(serverIsRunning) return;
    serverIsRunning = true;
    createServer(port);
}

function createServer(port) {
    winston.info("Starting server on port " + port);

    http.createServer(function (request, modifiedResponse) {
        winston.info("Received request for: " + request.url);

        var realRequest = http.request(request.url, function(realResponse) {
            responseManipulator.buildResponse(request.url, realResponse, modifiedResponse, rulesManager);
        });

        realRequest.on("error", function() {
            responseManipulator.buildResponse(request.url, null, modifiedResponse, rulesManager);
        });

        realRequest.end();

    }).listen(port);
}

module.exports = ProxyServer;
