"use strict";

var _ = require("underscore");

var Rules = function(rulesJson) {
    this.rules = rulesJson;
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

Rules.prototype.getBody = function() {
    if(!_.has(this.rules, "body")) return undefined;
    if(_.isUndefined(this.rules.body) || this.rules.body.length === 0) return undefined;
    return this.rules.body;
};

module.exports = Rules;
