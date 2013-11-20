"use strict";

var ReturnOriginalBody = require("./../Body/ReturnOriginalBody");
var ReplaceBody = require("./../Body/ReplaceBody");

module.exports.getStrategy = function (url, rules) {
    if(!shouldApplyRules(url, rules)) {
        return new ReturnOriginalBody();
    }

    return new ReplaceBody();
};

function shouldApplyRules(url, rules) {
    var urlFromRules = rules.getUrl();

    if(!urlFromRules) return false;
    if(urlsMatch(url, urlFromRules) && bodyRulesHaveBeenProvided(rules)) return true;
}

function urlsMatch(url, urlFromRules) {
    return url.toLowerCase().indexOf(urlFromRules) !== -1;
}

function bodyRulesHaveBeenProvided(rules) {
    var bodyLocationFromRules = rules.getBodyLocation();

    if(!bodyLocationFromRules) return false;
    return true;
}