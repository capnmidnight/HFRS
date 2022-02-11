(function () {
    var lastBoxPromise = Promise.resolve();
    var boxes = document.querySelectorAll(".callout");
    for (var i = 0; i < boxes.length; ++i) {
        lastBoxPromise = lastBoxPromise.then(function (box) {
            var y = -150,
                w = 3000,
                o = 1;

            box.style.top = y + "px";
            box.style.display = "";

            return new Promise(function (resolve, reject) {
                var timer = setInterval(function () {
                    if (y < 0) {
                        y += 2;
                        box.style.top = Math.min(0, y) + "px";
                    }
                    else if (w >
                        0) {
                        w -= 10;
                    }
                    else if (o >
                        0) {
                        o -= 0.025;
                        box.style.opacity = o;
                    }
                    else {
                        box.style.display = "none";
                        clearInterval(timer);
                        resolve();
                    }
                }, 10);
            });
        }.bind(window, boxes[i]));
    }
})();