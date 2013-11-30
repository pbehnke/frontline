"use strict";

var winston = require('winston');
var http = require('http');
var responseManipulator = require('./ResponseManipulator');
var rulesManager = require('./Rules/RulesManager');
var cfg = require('../config');
var path = require('path');

var serverIsRunning = false;

var ProxyServer = function(port) {
    this.port = port;
};

ProxyServer.prototype.start = function() {
    var self = this;
    winston.info("Proxy server started on " + self.port);
    rulesManager.onRulesRead(function(rules) {
        tryToCreateServer(self.port, rules);
    });
    rulesManager.buildRules(getRulesPath());
};

function tryToCreateServer(port, rules) {
    if(serverIsRunning) return;
    serverIsRunning = true;
    createServer(port, rules);
}

function createServer(port, rules) {
    http.createServer(function (request, modifiedResponse) {
        winston.info("Received request for: " + request.url);

        var realRequest = http.request(request.url, function(realResponse) {
            responseManipulator.buildResponse(request.url, realResponse, modifiedResponse);
        });

        realRequest.end();

    }).listen(port);
}

function getRulesPath() {
    return path.join(__dirname, "../Rules.json");
}

module.exports = ProxyServer;
