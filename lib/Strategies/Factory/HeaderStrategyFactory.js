"use strict";

var ReturnOriginalHeaders = require("./../Headers/ReturnOriginalHeaders");
var ReplaceHeaders = require("./../Headers/ReplaceHeaders");

module.exports.getStrategy = function (url, realResponse, rule) {
    if(!realResponse && urlContainsFavicon(url)) return new ReplaceHeaders(rule, realResponse, null);

    if(rule && urlsMatch(url, rule.getUrl())) {
        if(rule.getHeaders()) {
            return new ReplaceHeaders(rule, realResponse, rule.getHeaders());
        }
    }

    return new ReturnOriginalHeaders(rule, realResponse);
};


function urlsMatch(url, urlFromRule) {
    return url.toLowerCase().indexOf(urlFromRule) !== -1;
}

function urlContainsFavicon(url) {
    return url.toLowerCase().indexOf("favicon.ico") !== -1;
}
