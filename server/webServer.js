"use strict";

var http = require("http"),
  url = require("url"),
  core = require("./core.js"),
  routes = require("./controllers.js").filter((r) => !!r.URLPattern),
  Message = require("./Message.js");

// final, default GET handler.
routes.push({
  URLPattern: /.*/,
  GET: {
    "*/*": function (state) {
      var parts = url.parse(state.url),
        file = "." + parts.pathname;

      if (file[file.length - 1] === "/") {
        file += "index.html";
      }

      return Message.file(file);
    }
  }
});

function findController(request) {
  var accept = request.headers.accept,
    method = request.method,
    url = request.url;

  for (var i = 0; i < routes.length; ++i) {
    var route = routes[i],
      pattern = route.URLPattern,
      match = url.match(pattern);
    if (match) {
      var handlers = route[method];
      if (handlers) {
        for (var type in handlers) {
          var handler = handlers[type];
          if (accept.indexOf(type) >= 0) {
            for (var k = 1; k < match.length; ++k) {
              handler = handler.bind(null, match[k]);
            }
            return handler;
          }
        }
        return () => Message.NotAcceptable;
      }
      else {
        return () => Message.MethodNotAllowed;
      }
    }
  }
  return () => Message.NotFound;
}

function serveRequest( request, response ) {
  return parseBody(request)
    .then((body) => {
      return {
        url: request.url,
        body: body,
        cookies: parseCookies(request)
      };
    })
    .then((state) => findController(request)(state))
    .catch(( err ) => {
      return ( err instanceof Message ) ? err : Message.InternalServerError;
    })
    .then(( msg ) => msg.send( response ) );
}

function parseBody(request) {
  if (request.method === "PUT" || request.method === "POST") {
    return new Promise((resolve, reject) => {
      var len = request.headers["content-length"];
      if (len === undefined || len === null) {
        reject(Message.LengthRequired);
      }
      else {
        len = parseFloat(len);
        var body = [];
        request
          .on("data", (chunk) => body.push(chunk))
          .on("end", () => {
            var text = Buffer.concat( body ).toString();

            if (len !== text.length) {
              reject(Message.BadRequest);
            }
            else {
              try {
                if (request.headers["content-type"].indexOf("application/json") > -1) {
                  text = JSON.parse(text);
                }
                resolve(text);
              }
              catch (exp) {
                reject(Message.BadRequest);
              }
            }
          }).on("error", reject);
      }
    });
  }
  else {
    return Promise.resolve();
  }
}

function parseCookies(request, body) {
  if (request.headers.cookie) {
    return request.headers.cookie.split(";")
      .map((s) => s.trim())
      .map((s) => s.split("="))
      .map((arr) => {
        var obj = {};
        obj[arr[0]] = arr.length === 1 || arr[1];
        return obj;
      });
  }
}

module.exports = serveRequest;