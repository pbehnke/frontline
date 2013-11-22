"use strict";

var _ = require("underscore");

var Rules = function(rulesJson, body) {
    this.rules = rulesJson;
    this.body = body;
};

Rules.prototype.getUrl = function() {
    if(!_.has(this.rules, "url")) return undefined;
    if(_.isUndefined(this.rules.url) || this.rules.url.length === 0) return undefined;
    return this.rules.url;
};

Rules.prototype.getHeaders = function() {
    if(!_.has(this.rules, "headers")) return undefined;
    if(_.isEmpty(this.rules.headers)) return undefined;
    return this.rules.headers;
};

//Rules.prototype.getBodyLocation = function() {
//    if(!_.has(this.rules, "bodyLocation")) return undefined;
//    if(_.isUndefined(this.rules.bodyLocation) || this.rules.bodyLocation.length === 0) return undefined;
//    return this.rules.bodyLocation;
//};

Rules.prototype.getBody = function() {
    if(!_.has(this.body, "url")) return undefined;
    if(_.isUndefined(this.body) || this.body.length === 0) return undefined;
    return this.body;
};

module.exports = Rules;
