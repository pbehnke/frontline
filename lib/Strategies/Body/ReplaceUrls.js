var winston = require('winston');
var StringDecoder = require('string_decoder').StringDecoder;
var util = require('util');

var ReplaceUrls = function(rules, realResponse) {
    this.rules = rules;
    this.realResponse = realResponse;
};

ReplaceUrls.prototype.process = function(modifiedResponse) {
    var self = this;
    this.realResponse.on("data", function(chunk) {
        var modifiedChunk = tryToReplaceUrls(chunk, self.rules);
        modifiedResponse.write(modifiedChunk);
    });

    this.realResponse.on("end", function() {
        modifiedResponse.end();
    });
};

function tryToReplaceUrls(chunk, rules) {
    var urlReplacement = rules.getUrlReplacement();

    if(urlReplacement === undefined) return chunk;

    var decoder = new StringDecoder('utf8');
    var stringValue = decoder.write(chunk);

    winston.info(util.format("Replacing %s with %s.", urlReplacement.oldUrl, urlReplacement.newUrl));

    return stringValue.replace(new RegExp(urlReplacement.oldUrl, "g"), urlReplacement.newUrl);
}

module.exports = ReplaceUrls;

