"use strict";

var Message = require("../Message.js"),
  Contacts = require("../data/Contacts.js"),
  Users = require("../data/Users.js");

module.exports = {
  URLPattern: /^\/contacts(?:\/|\.html)?$/,
  GET: {
    "text/html": function (state) {
      if (Users.isAuthorized(state.cookies)) {
        return Message.file("./contacts.html");
      }
      else {
        return Message.redirect("/login?return=contacts");
      }
    },
    "application/json": function (state) {
      if (Users.isAuthorized(state.cookies)) {
        return Contacts.get()
          .then(Message.json);
      }
      else {
        return Message.Unauthorized;
      }
    }
  },
  POST: {
    "application/json": (state) => {
      return Contacts.set(state.body).then(Message.noContent);
    }
  }
};
