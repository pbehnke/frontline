"use strict";

var _ = require("underscore");

var Rules = function(rulesJson) {
    this.rules = rulesJson;
};

Rules.prototype.getUrl = function() {
    if(!_.has(this.rules, "url")) return undefined;
    if(this.rules.length === 0) return undefined;
    return this.rules.url;
};

Rules.prototype.getHeaders = function() {
    if(!_.has(this.rules, "headers")) return undefined;
    if(_.isEmpty(this.rules.headers)) return undefined;
    return this.rules.headers;
};

module.exports = Rules;
