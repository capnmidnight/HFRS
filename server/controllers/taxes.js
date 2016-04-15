"use strict";

var Message = require("../Message.js"),
  Users = require("../data/Users.js");

module.exports = {
  URLPattern: /^\/tax(?:\/|\.html)?$/,
  GET: {
    "text/html": (state) => {
      if (Users.getLoggedInUser(state.cookies)) {
        return Message.file("./tax.html");
      }
      else {
        return Message.redirect("/login?return=tax");
      }
    }
  }
};
