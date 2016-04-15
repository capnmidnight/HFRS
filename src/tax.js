
var PER_EXEMPTION = 930,
  DATA = {},
  SCRIPT = "";

Array.prototype.forEach.call(document.querySelectorAll("*[id]"), (elem) => {
  Object.defineProperty(DATA, elem.id, {
    get: getter.bind(null, elem),
    set: setter.bind(null, elem)
  });
  if (!elem.disabled) {
    elem.addEventListener("change", recalculate);
  }
  if (elem.dataset.expression) {
    SCRIPT += elem.id + " = " + elem.dataset.expression + ";\n";
  }
});

function getter(elem) {
  try {
    if (elem.type === "checkbox") {
      var mult = 0;

      if (/^VA4\w+$/.test(elem.id)) {
        mult = 930;
      }
      else if (/^FED4\w+$/.test(elem.id)) {
        mult = 4000;
      }
      return elem.checked ? mult : 0;
    }
    else {
      return parseFloat(elem.value) || 0;
    }
  }
  catch (exp) {
    console.error("failed to read " + id);
  }
}

function setter(elem, v) {
  elem.value = v.toFixed(2);
  return v;
}

function recalculate() {
  with (DATA) {
    try {
      for (var i = 0; i < 10; ++i) {
        var oldVA13 = VA13;
        eval(SCRIPT);
        if (Math.abs(VA13 - oldVA13) < 0.01) {
          break;
        }
      }
    }
    catch (exp) {
      console.error(exp);
      console.error(SCRIPT);
    }
  }
}

var now = new Date(),
  year = now.getYear(),
  week = 0;
while (now.getYear() === year) {
  for (var i = 0; i < 7; ++i) {
    now.setHours(-1);
  }
  ++week;
}

DATA.PRELIM2 = week;

recalculate();