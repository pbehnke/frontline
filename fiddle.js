"use strict";

var http = require('http');
var winston = require('winston');
var cfg = require('./Config');
var ProxyServer = require('./ProxyServer');

var proxyServer = new ProxyServer(cfg.proxyServer.port);
proxyServer.start();


//function forwardRequestAndProcessResponse(request, response, delegate) {
//    var forwardRequest = http.request(request.url, function(forwardResponse) {
//        delegate(response, forwardResponse);
//    });
//    forwardRequest.end();
//}
