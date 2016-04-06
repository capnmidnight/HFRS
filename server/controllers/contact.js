var fs = require("fs");

module.exports = {
  pattern: /^\/contacts\/?$/,
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
