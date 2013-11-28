"use strict";

var ReturnOriginalBody = require("./../Body/ReturnOriginalBody");
var ReplaceBody = require("./../Body/ReplaceBody");
var ReplaceUrls = require("./../Body/ReplaceUrls");
var rulesManager = require("../../Rules/RulesManager");

module.exports.getStrategy = function (url) {
    var rules = rulesManager.getRules();

    if(urlsMatch(url, rules.getUrl())) {
        if(shouldReplaceBody(rules)) {
            return new ReplaceBody(rules);
        }

        if(shouldReplaceUrls(rules)) {
            return new ReplaceUrls(rules);
        }
    }

    return new ReturnOriginalBody();
};

function shouldReplaceBody(rules) {
    var bodyLocationFromRules = rules.getBody();

    if(!bodyLocationFromRules) return false;
    return true;
}

function shouldReplaceUrls(rules) {
    var urlsToBeReplaced = rules.getUrlReplacement();

    if(!urlsToBeReplaced) return false;
    return true;
}

function urlsMatch(url, urlFromRules) {
    return url.toLowerCase().indexOf(urlFromRules) !== -1;
}