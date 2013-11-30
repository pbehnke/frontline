Fiddle
======

## What does it do?
+ You can overwrite headers being returned for a given URL
+ You can change the body being returned by a given URL
+ You can find and replace all urls on the page
+ You can quickly build fake JSON data services for proof of concepts in AJAX

## Why would you want this?
To help intercept, change and debug web pages for web development.
Fiddle is a transparent web debugging proxy that can be used for any browser.

## Limitations
Currently Fiddle only supports overriding/modifying a single Url.

## Quick Start
* Install Node.
* Open Rules.json and add some rules (see Rules.json section below)
* Run
`node fiddle.js`
* Open your browser of choice. In this example we will use Chrome.
In Chrome Open Settings, click Show advanced settings... at the bottom. Change Proxy Settings.
Set the proxy server to be 127.0.0.1 and set the port to 8050.
* You can modify the Rules.json without having to restart the Proxy Server

## Rules.json
All available options are listed below. Make sure you keep the format of this file in true Json format. I.e. keys enclosed in quotation marks.

```json
{
    "url": "websitetomodify.com",
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Some-Custom-Header": "My custom value"
    },
    "body": "Hello World",
    "replaceUrls": {
        "oldUrl": "replacethisurl.com",
        "newUrl": "withthisurl.com"
    }
}
```

### Details
| Key               | Value                                                                                  |
| ------------------|:--------------------------------------------------------------------------------------:|
| url               | Set this URL to the URL that you want to modify. Fiddle will ignore all other URLs.    |
| headers           | Specifying any headers here will override any headers returned by the original server. |
| body              | Specifying any body will override any body returned by the original server.            |
| oldUrl            | Set this to the URL you want to find                                                   |
| newUrl            | Set this to the URL you want to replace with                                           |


## config.js

```javascript
{
    proxyServer: {
        port: 8050
    },
    paths: {
        rules: "Rules.json"
    }
}
```

### Details
| Key               | Value                                                                                  |
| ------------------|:--------------------------------------------------------------------------------------:|
| port              | The port that the proxy server runs on.                                                |
| rules             | The path to the rules file.                                                            |
