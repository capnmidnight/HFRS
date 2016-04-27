(function () {
  "use strict";

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

  var fields = ["name", "email", "phone", "company", "description"],
    btn = null;

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
})();