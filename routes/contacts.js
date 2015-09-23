var express = require("express"),
        fs = require("fs"),
        router = express.Router(),
        originTest = /^https?:\/\/(localhost|(www\.)?highlandfrs.com)(:\d+)?(\/|$)/;


function accessControl(req, res) {
    var origin = req.headers.origin || req.headers.referer,
            allowed = originTest.test(origin);
    if (allowed) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    return allowed;
}

router.options("/", function (req, res) {
    if (!accessControl(req, res)) {
        res.sendStatus(403);
    }
    else {
        res.sendStatus(200);
    }
});

router.post("/", function (req, res) {
    if (!accessControl(req, res)) {
        res.sendStatus(403);
    }
    else {
        fs.appendFileSync("contacts", JSON.stringify(req.body) + ",\n");
        res.send(JSON.stringify({
            status: "success",
            message: "success"
        }));
    }
});

module.exports = router;
