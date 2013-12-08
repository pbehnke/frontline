"use strict";

var ReturnOriginalHeaders = require("./../Headers/ReturnOriginalHeaders");
var ReplaceHeaders = require("./../Headers/ReplaceHeaders");
var rulesManager = require("../../Rules/RulesManager");

module.exports.getStrategy = function (url, realResponse) {
    var rules = rulesManager.getRules();

    if(urlsMatch(url, rules.getUrl())) {
        if(rules.getHeaders()) {
            return new ReplaceHeaders(rules);
        }
    }

    return new ReturnOriginalHeaders(rules);
};


function urlsMatch(url, urlFromRules) {
    return url.toLowerCase().indexOf(urlFromRules) !== -1;
}
