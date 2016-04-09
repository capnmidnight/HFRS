"use strict";

var http = require("http"),
  url = require("url"),
  core = require("./core.js"),
  routes = require("./controllers.js"),
  Message = require("./Message.js");


function findController(request) {
  for (var i = 0; i < routes.length; ++i) {
    var route = routes[i],
      matches = request.url.match(route.pattern);
    if (matches) {
      matches.shift();
      var method = request.method.toUpperCase(),
        handler = route[method];
      if (!handler) {
        return Message.methodNotAllowed.bind(Message, request.url);
      }
      else {
        for (var i = 0; i < matches.length; ++i) {
          handler = handler.bind(route, matches[i]);
        }
        return handler;
      }
    }
  }
}

function matchController(request) {
  var controller = findController(request);
  if (controller) {
    return parseBody(request)
      .then(body=> {
        return {
          body: body,
          cookies: parseCookies(request)
        };
      })
      .then(controller)
      .catch(err => {
        return Message.error(500, err.message);
      });
  }
  else {
    return Promise.reject();
  }
}

function parseBody(request) {
  if (request.method === "PUT" || request.method === "POST") {
    return new Promise((resolve, reject) => {
      var body = [];
      request
        .on("data", chunk => body.push(chunk))
        .on("end", () => {
          var text = Buffer.concat(body).toString();
          if (request.headers["content-type"].indexOf("json") > -1) {
            text = JSON.parse(text);
          }

          resolve(text);
        }).on("error", reject);
    });
  }
  else {
    return Promise.resolve();
  }
}

function parseCookies(request, body) {
  if (request.headers.cookie) {
    return request.headers.cookie.split(";")
      .map(s=> s.trim())
      .map(s=> s.split("="))
      .map(arr=> {
        var obj = {};
        obj[arr[0]] = arr.length === 1 || arr[1];
        return obj;
      });
  }
}

function serveRequest(request, response) {
  matchController(request)
    .catch(err=> new Promise((resolve, reject) => {
      if (request.method !== "GET") {
        resolve(Message.methodNotAllowed(request.url));
      }
      else {
        var parts = url.parse(request.url),
          file = "." + parts.pathname;

        if (file[file.length - 1] === "/") {
          file += "index.html";
        }

        resolve(Message.file(file));
      }
    }))
    .then(msg => msg.send(response));
}

module.exports = serveRequest;