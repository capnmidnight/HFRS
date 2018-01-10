(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

if (!HTMLFormElement.prototype.reportValidity) {
  HTMLFormElement.prototype.reportValidity = function () {
    var elements = this.querySelectorAll("input, textarea"),
      areAllValid = true,
      firstInvalid = null;
    for (var i = 0; i < elements.length; ++i) {
      var elem = elements[i],
        isValid = true,
        pattern = elem.pattern;

      if (!pattern) {
        switch (elem.type) {
          case "email":
            pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}";
        }
      }

      elem.style.backgroundColor = "";
      if (elem.required && elem.value.length === 0) {
        isValid = false;
      }
      else if (elem.value.length > 0 && pattern) {
        var regex = new RegExp("^" + pattern + "$");
        isValid = regex.test(elem.value);
      }

      if (!isValid) {
        elem.style.backgroundColor = "#ffc0c0";
        if (!firstInvalid) {
          firstInvalid = elem;
        }
      }

      areAllValid = areAllValid && isValid;
    }

    if (firstInvalid) {
      firstInvalid.scrollIntoView();
    }
    return areAllValid;
  };
}

var fields = ["name", "email", "phone", "company", "description"];
var btn = null;

function trimField() {
  this.value = this.value.trim();
}

window.addEventListener("load", function () {
  if (document.forms && document.forms.contactForm) {
    Array.prototype.slice.call(document.forms.contactForm.querySelectorAll(
      "input, textarea"))
      .forEach(function (elem) {
        elem.addEventListener("blur", trimField.bind(elem), false);
      });

    btn = document.getElementById("submitContact");
    btn.addEventListener("click", sendContact);
  }
}, false);

function sendContact() {
  var form = document.querySelector('#contactForm'),
    successMessage = document.querySelector('#submissionSuccess'),
    errorMessage = document.querySelector('#submissionError'),
    oldClass = btn.className,
    oldHref = btn.href;
  if (form.reportValidity()) {
    form.parentElement.style.backgroundColor = "#c0c0c0";
    btn.className += " disabled";
    btn.innerHTML = "Submitting...";
    var interval = setInterval(function () {
      btn.innerHTML += ".";
    }, 1000);
    btn.removeEventListener("click", sendContact);
    btn.style.cursor = "wait";
    var data = fields.reduce(function (obj, k) {
      var elem = form["contact_" + k],
        value = elem.value;
      value = value.trim();
      if (value.length > 0) {
        obj[k] = value;
      }
      elem.disabled = true;
      return obj;
    }, {});

    function clear(box, msg) {
      clearInterval(interval);
      form.parentElement.style.backgroundColor = "";
      form.style.display = "none";
      box.style.display = "block";
      box.scrollIntoView();
      if (window.ga) {
        ga("send", "event", "contactlist", msg);
      }
    }

    sendObjectGetObject("/contacts/", { data: data })
      .then(function (msg) {
        clear(successMessage, "success");
        var b = document.querySelector("#callbackName");
        b.innerHTML = "";
        b.appendChild(document.createTextNode(data.name));
      })
      .catch(clear.bind(null, errorMessage, "fail"));
  }
}

var imgs = document.querySelectorAll( "#news > blockquote > img" );
var box = document.createElement( "div" );
var disp = document.createElement( "img" );
box.id = "shadowbox";
box.className = "hide";
box.appendChild( disp );
document.body.appendChild( box );
for ( var i = 0; i < imgs.length; ++i ) {
  if(imgs[i].src.indexOf("thumb") >= 0){
    imgs[i].className = "thumbnail";
    imgs[i].addEventListener( "click", function ( box, disp ) {
      box.className = "show";
      disp.src = this.src.replace("thumb", "full");
    }.bind( imgs[i], box, disp ), false );
  }
}

box.addEventListener( "click", function () {
  this.className = "hide";
}, false );

function MapResizer ( img, map ) {
  var originalCoords = [ ],
      test = new Image();

  for ( var i = 0; i < map.areas.length; ++i ) {
    var coords = map.areas[i].coords;
    originalCoords.push( coords.split( "," ).map( parseFloat ) );
  }

  function resize () {
    var ratio = img.width / test.width;
    for ( var i = 0; i < map.areas.length; ++i ) {
      map.areas[i].coords = originalCoords[i].map( function ( n ) {
        return ratio * n;
      } ).join( "," );
    }
  }

  test.addEventListener( "load", function () {
    window.addEventListener( "resize", resize, false );
    resize();
  }, false );

  test.src = img.src;
}

window.addEventListener( "load", function () {
  var imgs = document.querySelectorAll( "img[usemap]" );
  for ( var i = 0; i < imgs.length; ++i ) {
    var map = document.querySelector( "map[name=" + imgs[i].useMap.substring( 1 ) + "]" );
    MapResizer( imgs[i], map );
  }
}, false );

var FADE_LEN = 500;
function Rotator(elem) {
  var c = [],
    len = elem.children.length,
    n = 0,
    pips = [],
    pager = document.createElement("div"),
    t = 0,
    ttl = elem.dataset.timeout || 3000,
    mid = ttl / 2;

  for (var i = 0; i < len; ++i) {
    c[i] = elem.children[i];
    c[i].style.position = "absolute";
    c[i].style.marginTop = 0;
    c[i].style.marginBottom = 0;
    pips[i] = document.createElement("span");
    pips[i].innerHTML = "●";
    pips[i].className = "pip";
    pips[i].onclick = tick.bind(this, i);
    pager.appendChild(pips[i]);

    if (i > 0) {
      hide(i);
    }
    else {
      show(i);
    }
  }

  pager.style.margin = 0;
  pager.style.padding = 0;
  elem.insertBefore(pager, c[0]);

  function resize() {
    var maxHeight = 0;
    for (var i = 0; i < c.length; ++i) {
      maxHeight = Math.max(maxHeight, c[i].clientHeight);
    }
    elem.style.position = "relative";
    elem.style.height = (maxHeight + pager.clientHeight) + "px";
  }
  resize();
  window.addEventListener("resize", resize, false);

  function hide(i) {
    c[i].style.opacity = 0;
    pips[i].style.cursor = "pointer";
    pips[i].style.opacity = 0.25;
  }

  function show(i) {
    c[i].style.opacity = 1;
    pips[i].style.cursor = "default";
    pips[i].style.opacity = 1;
  }

  function tick(i) {
    hide(n);
    t = 0;
    n = i;
    show(n);
  }

  function isInViewport() {
    var rect = elem.getBoundingClientRect(),
      inBounds = rect.bottom >= 0
        && rect.top <= window.innerHeight;

    return inBounds;
  }

  var lt = 0;
  this.update = function (ft) {
    var dt = ft - lt;
    lt = ft;
    t += dt;
    if (isInViewport()) {
      if (t >= ttl) {
        tick((n + 1) % len);
      }
      c[n].style.opacity = Math.min(1, (mid - Math.abs(t - mid)) / FADE_LEN);
    }
  };
}

window.addEventListener("load", function () {
  var rotators = [],
    elems = document.querySelectorAll(".rotator");
  for (var i = 0; i < elems.length; ++i) {
    rotators.push(new Rotator(elems[i]));
  }

  function updateAll(dt) {
    requestAnimationFrame(updateAll);
    for (var i = 0; i < rotators.length; ++i) {
      rotators[i].update(dt);
    }
  }

  requestAnimationFrame(updateAll);
}, false);

})));
//# sourceMappingURL=home.js.map
