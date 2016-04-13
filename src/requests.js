var typeMappings = {
  "document": "text/html",
  "json": "application/json",
  "text": "text/plain"
};
function XHR(method, responseType, url, options) {
  return new Promise(function (resolve, reject) {
    options = options || {};
    options.headers = options.headers || {};
    options.headers.Accept = options.headers.Accept || typeMappings[responseType] || responseType;

    var req = new XMLHttpRequest();
    req.onerror = function (evt) { reject(new Error("Request error: " + evt.message)) };
    req.onabort = function (evt) { reject(new Error("Request abort: " + evt.message)) };
    req.onload = function () {
      // The other error events are client-errors. If there was a server error,
      // we'd find out about it during this event. We need to only respond to
      // successful requests, i.e. those with HTTP status code in the 200 or 300
      // range.
      if (req.status < 400) {
        resolve(req.response);
      }
      else {
        reject(req);
      }
    };

    // The order of these operations is very explicit. You have to call open
    // first. It seems counter intuitive, but think of it more like you're opening
    // an HTTP document to be able to write to it, and then you finish by sending
    // the document. The "open" method does not refer to a network connection.
    req.open(method, url);
    if (responseType) {
      req.responseType = responseType;
    }

    req.onprogress = options.progress;

    for (var key in options.headers) {
      req.setRequestHeader(key, options.headers[key]);
    }

    req.withCredentials = !!options.withCredentials;

    if (options.data) {
      req.send(options.data);
    }
    else {
      req.send();
    }
  });
}

function post(type, url, options) {
  return XHR("POST", type, url, options);
}

function sendObject(type, url, options) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers["content-type"] = options.headers["content-type"] || "application/json;charset=UTF-8";
  if (typeof options.data !== "string") {
    options.data = JSON.stringify(options.data);
  }
  return post(type, url, options);
}

function sendObjectGetText(url, options) {
  return sendObject("text", url, options);
}

function sendObjectGetObject(url, options) {
  return sendObject("json", url, options);
}

function get(type, url, options) {
  return XHR("GET", type || "text", url, options);
}

function getText(url, options) {
  return get("text", url, options);
}

function getHTML(url, options) {
  return get("document", url, options);
}

function getObject(url, options) {
  return get("json", url, options);
}

function getBuffer(url, options) {
  return get("arraybuffer", url, options);
}