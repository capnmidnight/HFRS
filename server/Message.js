"use strict";

const core = require("./core.js"),
  fs = require("fs"),
  http = require("http"),
  mime = require("mime"),
  stream = require("stream"),
  headerTranslation = {
    length: "content-length",
    mime: "content-type"
  };

class Message {
  constructor(httpStatusCode, httpBody, httpHeaders, cookies) {
    this.statusCode = httpStatusCode;

    this.headers = {};
    if (httpHeaders !== undefined && httpHeaders !== null) {
      for (var k in httpHeaders) {
        var key = k.toLowerCase();
        key = headerTranslation[key] || key;
        this.headers[key] = httpHeaders[k];
      }
    }

    if (cookies) {
      this.headers["set-cookie"] = cookies.map(cookie=> Object.keys(cookie)
        .filter(key=> cookie[key] === false)
        .map(key=> cookie[key] === true ? key : key + "=" + cookie[key])
        .join("; "));
    }

    if (this.statusCode < 400 && this.headers["connection"] === undefined) {
      this.headers["connection"] = "keep-alive";
    }

    this.body = httpBody;
  }

  get body() {
    return this._body;
  }

  set body(httpBody) {

    this._body = httpBody || "";

    if (typeof this._body !== "string" && !(this._body instanceof stream.Readable)) {
      var type = typeof this._body;
      if (type !== "object") {
        this._body = {
          type: type,
          value: this._body
        };
      }
      this._body = JSON.stringify(this._body);
      this.headers["content-type"] = "application/json";
    }

    if (typeof this._body === "string") {
      this.headers["content-length"] = this._body.length;
    }
    else if (this.length === undefined || this.length === null) {
      throw new Error("You must provide a content-length header when using Readable streams for content bodies.");
    }
    else if (this.length > 0 && (this.mime === undefined || this.mime === null)) {
      throw new Error("You must provide a content-type for the responses that have length greater than 0.");
    }
  }

  get length() {
    return this.headers["content-length"];
  }

  get mime() {
    return this.headers["content-type"];
  }

  send(response) {
    if (response.finished) {
      console.trace("Can't send a message over a finished response object.");
    }
    else {
      response.writeHead(this.statusCode, this.headers);
      if (this.length === 0) {
        response.end();
      }
      else if (typeof this.body === "string") {
        response.end(this.body);
      }
      else if (this._body instanceof stream.Readable) {
        this.body.pipe(response);
      }
      else {
        // eeeh, what?
        throw new Error("INCONSISTENT STATE!!!");
      }
    }
  }
}

Message.OK = new Message(200);

Message.json = function (obj, cookies) {
  return new Message(200, obj, {
    mime: "application/json"
  }, cookies);
};

Message.text = function (txt, cookies) {
  return new Message(200, txt, {
    mime: "text/plain"
  }, cookies);
};

Message.html = function (html, cookies) {
  return new Message(200, html, {
    mime: "text/html"
  }, cookies);
};

Message.redirect = function (url, cookies) {
  return new Message(307, null, {
    "location": url
  }, cookies);
};

Message.file = function (fileName, cookies) {
  return new Promise((resolve, reject) => {
    fs.lstat(fileName, (err, stat) => {
      if (err) {
        resolve(Message.error(404, request.url));
      }
      else if (stat.isDirectory()) {
        resolve(Message.redirect(request.url + "/"));
      }
      else {
        resolve(new Message(200, fs.createReadStream(fileName), {
          mime: mime.lookup(fileName),
          length: stat.size
        }, cookies));
      }
    });
  });
};

Message.error = function (httpStatusCode, requestedURL) {
  var rest = Array.prototype.slice.call(arguments, 2),
    msg = core.fmt("URL: [$1] $2: $3", requestedURL, httpStatusCode, http.STATUS_CODES[httpStatusCode]);
  if (rest.length > 0) {
    msg += core.fmt(" -> [$1]", rest.join("], ["));
  }
  return new Message(httpStatusCode, msg);
};

Message.methodNotAllowed = function (requestedURL) {
  return Message.error(405, requestedURL);
};

module.exports = Message;