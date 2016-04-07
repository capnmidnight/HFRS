var fs = require("fs");

module.exports = {
  pattern: /^\/contacts\/?$/,
  GET: function (params, sendData, serverError, body) {
    var contacts = fs.readFileSync("contacts", "utf8").trim();
    if (contacts[contacts.length - 1] === ",") {
      contacts = contacts.substring(0, contacts.length - 1);
    }
    sendData("application/json", "{\"contacts\":[" + contacts + "]}");
  },
  POST: function (params, sendData, serverError, body) {
    body.date = new Date();
    fs.appendFileSync("contacts", JSON.stringify(body) + ",\n");
    sendData("application/json", JSON.stringify({
      status: "success",
      message: "success"
    }));
  },
  OPTIONS: function (params, sendData, serverError, body) {
    sendData("text/plain");
  }
};
