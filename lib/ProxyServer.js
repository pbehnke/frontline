"use strict";

var winston = require('winston');
var http = require('http');
var responseManipulator = require('./ResponseManipulator');
var FileWatcher = require('./FileReaders/FileWatcher');
var cfg = require("../config");

var serverIsRunning = false;

var ProxyServer = function(port) {
    this.port = port;
};

ProxyServer.prototype.start = function() {
    var self = this;
    winston.info("Proxy server started on " + self.port);
    readRulesAndThenRunTheApplication();
};

function readRulesAndThenRunTheApplication() {
    var rulesReader = new FileWatcher(cfg.paths.rules);

    rulesReader.onFileRead(function(rules) {
        responseManipulator.setRules(rules);

        var bodyLocation = rules.getBodyLocation();

        if(bodyLocation)
        tryToCreateServer(self.port);
    });

    rulesReader.readRules();
}

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
