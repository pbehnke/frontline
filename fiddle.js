"use strict";

var http = require('http');
var winston = require('winston');
var cfg = require('./Config');
var ProxyServer = require('./lib/ProxyServer');

var proxyServer = new ProxyServer(cfg.proxyServer.port);
proxyServer.start();
