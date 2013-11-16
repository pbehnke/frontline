"use strict";

var returnOriginalHeaders = require("./../Headers/ReturnOriginalHeaders");
var addOrUpdateHeaders = require("./../Headers/AddOrUpdateHeaders");

module.exports.getStrategy = function (url, rules) {
    if(!shouldApplyRules(url, rules)) {
        return returnOriginalHeaders;
    }

    return addOrUpdateHeaders;
};

function shouldApplyRules(url, rules) {
    return url.toLowerCase().indexOf(rules.url) !== -1;
}

