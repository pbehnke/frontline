"use strict";

var ReturnOriginalBody = require("./../Body/ReturnOriginalBody");
var ReplaceBody = require("./../Body/ReplaceBody");
var ReplaceUrls = require("./../Body/ReplaceUrls");
var rulesManager = require("../../Rules/RulesManager");

module.exports.getStrategy = function (url, realResponse) {
    var rules = rulesManager.getRules();

    if(urlsMatch(url, rules.getUrl())) {
        if(!realResponse && rules.getBody()) return new ReplaceBody(rules);

        if(realResponse) {
            if(rules.getBody()) return new ReplaceBody(rules);
            if(rules.getUrlReplacement()) return new ReplaceUrls(rules);
        }
    }

    return new ReturnOriginalBody(rules);
};


function urlsMatch(url, urlFromRules) {
    return url.toLowerCase().indexOf(urlFromRules) !== -1;
}