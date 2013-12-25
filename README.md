Frontline
======

## What does it do?
+ You can overwrite headers being returned for a given URL
+ You can change the body being returned by a given URL
+ You can find and replace all urls on the page
+ You can quickly build fake JSON data services for proof of concepts in AJAX

## Why would you want this?
To help intercept, change and debug web pages for web development.
Frontline is a transparent web debugging proxy that can be used for any browser.

## Quick Start
* Install Node `brew install nodejs`.
* Install frontline `npm install -g frontline`
* Create a Rules.json file - see the below example for options
* Run the program via command line. `frontline --port 8050 --pathToRulesFile {path to your Rules.json here}`
* Open your browser of choice. In this example we will use Chrome.
In Chrome Open Settings, click Show advanced settings... at the bottom. Change Proxy Settings.
Set the proxy server to be 127.0.0.1 and set the port to 8050.
* You can modify the Rules.json without having to restart the Proxy Server

## Rules.json
All available options are listed below.
**Make sure you keep the format of this file in true Json format. I.e. keys enclosed in quotation marks.**

### Example #1 - Return some json
```json
[{
    "url": "sebtest.com/abc",
    "headers": {
    	"Content-Type": "application/json"
    },
    "body": {
    	"a": "b"
    }
}]
```

### Example #2 - Return a new body
```json
[{
    "url": "websitetomodify.com",
    "headers": {
        "Content-Type": "text/html",
        "Some-Custom-Header": "My custom value"
    },
    "body": "Hello World"
}]
```

### Example #3 - Find and repalce URLs in the body
```json
[{
    "url": "websitetomodify.com",
    "replaceUrls": {
        "oldUrl": "replacethisurl.com",
        "newUrl": "withthisurl.com"
    }
}]
```

### Example #4 - Hooking them all together in a single Rules.json file
```json
[{
     "url": "sebtest.com/abc",
     "headers": {
     	"Content-Type": "application/json"
     },
     "body": {
     	"a": "b"
     }
 },
 {
     "url": "websitetomodify.com",
     "headers": {
         "Content-Type": "text/html",
         "Some-Custom-Header": "My custom value"
     },
     "body": "Hello World"
 },
 {
     "url": "websitetomodify.com",
     "replaceUrls": {
         "oldUrl": "replacethisurl.com",
         "newUrl": "withthisurl.com"
     }
 }]
```

### Details
| Key               | Value                                                                                  |
| ------------------|:--------------------------------------------------------------------------------------:|
| url               | Set this URL to the URL that you want to modify. Frontline will ignore all other URLs.    |
| headers           | Specifying any headers here will override any headers returned by the original server. |
| body              | Specifying any body will override any body returned by the original server.            |
| oldUrl            | Set this to the URL you want to find                                                   |
| newUrl            | Set this to the URL you want to replace with                                           |