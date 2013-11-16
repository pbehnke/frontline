"use strict";

var winston = require('winston');
var http = require('http');
var responseManipulator = require('./ResponseManipulator');
var RulesReader = require('./RulesReader');

var serverIsRunning = false;

var ProxyServer = function(port) {
    this.port = port;
};

ProxyServer.prototype.start = function() {
    var self = this;
    winston.info("Proxy server started on " + self.port);

    var rulesReader = new RulesReader();

    rulesReader.onRulesRead(function(rules) {
        responseManipulator.setRules(rules);
        tryToCreateServer(self.port);
    });

    rulesReader.readRules();
};

function createServer(port) {
    http.createServer(function (request, modifiedResponse) {
        winston.info("Received request for: " + request.url);

        var realRequest = http.request(request.url, function(realResponse) {
            responseManipulator.buildResponse(request.url, realResponse, modifiedResponse);
        });
        realRequest.end();

    }).listen(port);
}

function tryToCreateServer(port) {
    if(serverIsRunning) return;
    serverIsRunning = true;
    createServer(port);
}

module.exports = ProxyServer;
