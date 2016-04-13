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
          if (type === "*/*" || accept.indexOf(type) >= 0) {
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

function serveRequest(request, response) {
  return parseBody(request)
    .then((body) => {
      return {
        url: request.url,
        body: body,
        cookies: parseCookies(request)
      };
    })
    .then((state) => findController(request)(state))
    .catch((err) => {
      return (err instanceof Message) ? err : Message.InternalServerError;
    })
    .then((msg) => msg.send(response));
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    var body = [],
      size = 0,
      len = 0;
    request
      .on("data", (chunk) => {
        body.push(chunk);
        if (size === 0) {
          len = request.headers["content-length"];
          if (len === undefined || len === null) {
            reject(Message.LengthRequired);
          }
          else {
            len = parseFloat(len);
          }

          size += chunk.length;
        }

        if (size > 5e6) {
          reject(Message.PayloadTooLarge);
        }
      })
      .on("end", () => {
        var text = Buffer.concat(body).toString();
        if (text.length === 0) {
          resolve();
        }
        else{
          var type = request.headers["content-type"];
          if (!type) {
            reject(Message.BadRequest);
          }
          else if (len !== text.length) {
            reject(Message.BadRequest);
          }
          else {
            try {
              if (type.indexOf("application/json") > -1) {
                text = JSON.parse(text);
              }
              resolve(text);
            }
            catch (exp) {
              reject(Message.BadRequest);
            }
          }
        }
      }).on("error", reject);
  });
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