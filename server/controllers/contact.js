var fs = require("fs"),
  DATA_FILE_NAME = "contacts_list";

module.exports = {
  pattern: /^\/contacts\/?$/,
  GET: function (params, sendData, serverError, body) {
    fs.readFile(DATA_FILE_NAME, "utf8", function (err, contacts) {
      contacts = contacts.trim();
      if (contacts[contacts.length - 1] === ",") {
        contacts = contacts.substring(0, contacts.length - 1);
      }
      sendData("application/json", "{\"contacts\":[" + contacts + "]}");
    });
  },
  POST: function (params, sendData, serverError, body) {
    body.date = new Date();
    fs.appendFileSync(DATA_FILE_NAME, JSON.stringify(body) + ",\n");
    sendData("application/json", JSON.stringify({
      status: "success",
      message: "success"
    }));
  },
  OPTIONS: function (params, sendData, serverError, body) {
    sendData("text/plain");
  }
};
