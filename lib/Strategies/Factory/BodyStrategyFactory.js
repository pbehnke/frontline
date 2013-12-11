"use strict";

var ReturnOriginalBody = require("./../Body/ReturnOriginalBody");
var ReplaceBody = require("./../Body/ReplaceBody");
var ReplaceUrls = require("./../Body/ReplaceUrls");
var _ = require("underscore");

var DEFAULT_EMPTY_BODY_VALUE = "";

module.exports.getStrategy = function (url, realResponse, rule) {
    if(!realResponse && urlContainsFavicon(url)) return new ReplaceBody(rule, realResponse, DEFAULT_EMPTY_BODY_VALUE);

    if(rule && urlsMatch(url, rule.getUrl())) {
        if(rule.getBody()) return new ReplaceBody(rule, realResponse, ifContentIsJsonThenStringify(rule.getBody()));
        if(realResponse && rule.getUrlReplacement()) return new ReplaceUrls(rule, realResponse);
    }

    return new ReturnOriginalBody(rule, realResponse);
};

function urlsMatch(url, urlFromRules) {
    return url.toLowerCase().indexOf(urlFromRules) !== -1;
}

function urlContainsFavicon(url) {
    return url.toLowerCase().indexOf("favicon.ico") !== -1;
}

function ifContentIsJsonThenStringify(content) {
    if(isContentJSON(content)) return JSON.stringify(content);
    return content;
}

function isContentJSON(content) {
    return _.isObject(content);
}