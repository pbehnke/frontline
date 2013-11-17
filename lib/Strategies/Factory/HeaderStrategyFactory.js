"use strict";

var returnOriginalHeaders = require("./../Headers/ReturnOriginalHeaders");
var replaceHeaders = require("./../Headers/ReplaceHeaders");

module.exports.getStrategy = function (url, rules) {
    if(!shouldApplyRules(url, rules)) {
        return returnOriginalHeaders;
    }

    return replaceHeaders;
};

function shouldApplyRules(url, rules) {
    return url.toLowerCase().indexOf(rules.url) !== -1;
}

