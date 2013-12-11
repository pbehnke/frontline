"use strict";

var Q = require("q");
var winston = require("winston");
var check = require('validator').check;

var Rule = function() {};

Rule.prototype.initializeFromJson = function(json) {
    var self = this;

    return Q.fcall(function() {
        if(!json) throw new Error("JSON was not provided.");
        if(!json.url) throw new Error("URL was not provided.");
        check(json.url).isUrl();
        if(!json.headers && !json.body) throw new Error("Either headers or a body must be present.");

        self.rules = json;

        winston.info("Set Rule: " + self.toString());
        return self;
    });
};

Rule.prototype.getUrl = function() {
    return this.rules.url;
};

Rule.prototype.getHeaders = function() {
    return this.rules.headers;
};

Rule.prototype.getBody = function() {
    return this.rules.body;
};

Rule.prototype.getUrlReplacement = function() {
    return this.rules.replaceUrls;
};

Rule.prototype.toString = function() {
    return JSON.stringify(this.rules);
};

module.exports = Rule;
