"use strict";

var ReturnOriginalBody = require("./../Body/ReturnOriginalBody");
var ReplaceBody = require("./../Body/ReplaceBody");
var ReplaceUrls = require("./../Body/ReplaceUrls");
var rulesManager = require("../../Rules/RulesManager");

module.exports.getStrategy = function (url, realResponse) {
    var rules = rulesManager.getRules();

    if(!realResponse && urlContainsFavicon(url)) return new ReplaceBody(rules, realResponse, "");

    if(urlsMatch(url, rules.getUrl())) {
        if(rules.getBody()) return new ReplaceBody(rules, realResponse, rules.getBody());
        if(realResponse && rules.getUrlReplacement()) return new ReplaceUrls(rules, realResponse);
    }

    return new ReturnOriginalBody(rules, realResponse);
};

function urlsMatch(url, urlFromRules) {
    return url.toLowerCase().indexOf(urlFromRules) !== -1;
}

function urlContainsFavicon(url) {
    return url.toLowerCase().indexOf("favicon.ico") !== -1;
}