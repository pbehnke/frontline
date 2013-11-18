"use strict";

var ReturnOriginalHeaders = require("./../Headers/ReturnOriginalHeaders");
var ReplaceHeaders = require("./../Headers/ReplaceHeaders");

module.exports.getStrategy = function (url, rules) {
    if(!shouldApplyRules(url, rules)) {
        return new ReturnOriginalHeaders();
    }

    return new ReplaceHeaders();
};

function shouldApplyRules(url, rules) {
    var urlFromRules = rules.getUrl();

    if(!urlFromRules) return false;
    if(urlsMatch(url, urlFromRules) && headerRulesHaveBeenProvided(rules)) return true;
}

function urlsMatch(url, urlFromRules) {
    return url.toLowerCase().indexOf(urlFromRules) !== -1;
}

function headerRulesHaveBeenProvided(rules) {
    var headersFromRules = rules.getHeaders();

    if(!headersFromRules) return false;
    return true;
}

