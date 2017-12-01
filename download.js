(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function XHR(method, type, url, options) {
  return new Promise(function (resolve, reject) {
    options = options || {};
    options.headers = options.headers || {};
    if (method === "POST") {
      options.headers["Content-Type"] = options.headers["Content-Type"] || type;
    }

    var req = new XMLHttpRequest();
    req.onerror = (evt) => reject(new Error("Request error: " + evt.message));
    req.onabort = (evt) => reject(new Error("Request abort: " + evt.message));
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
    // the document. The `open` method does not refer to a network connection.
    req.open(method, url);
    if (type) {
      req.responseType = type;
    }

    req.onprogress = options.progress;

    for (var key in options.headers) {
      req.setRequestHeader(key, options.headers[key]);
    }

    req.withCredentials = !!options.withCredentials;

    if (options.data) {
      req.send(JSON.stringify(options.data));
    }
    else {
      req.send();
    }
  });
}

function get(type, url, options) {
  return XHR("GET", type || "text", url, options);
}

function getText(url, options) {
  return get("text", url, options);
}

(async function() {
  const stripeKey = await getText("/stripe-key"),
    form = document.querySelector("form"),
    script = document.createElement("script");

  Object.assign(script, {
    className: "stripe-button",
    src: "https://checkout.stripe.com/checkout.js"
  });

  Object.assign(script.dataset, {
    key: stripeKey,
    amount: 1500,
    name: "CPT Mr. Who?",
    description: "How Bad Add/Sals Can Sink Your Stewardship",
    image: "https://www.highlandfrs.com/images/logo.min.png",
    locale: "auto",
    zipCode: true
  });

  form.appendChild(script);
})();

})));
//# sourceMappingURL=download.js.map
