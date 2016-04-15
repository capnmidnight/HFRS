"use strict";

var Message = require("../Message.js"),
  Contacts = require("../data/Contacts.js"),
  Users = require("../data/Users.js");

module.exports = {
  URLPattern: /^\/contacts(?:\/|\.html)?$/,
  GET: {
    "text/html": (state) => {
      if (Users.getLoggedInUser(state.cookies)) {
        return Message.file("./contacts.html");
      }
      else {
        return Message.redirect("/login?return=contacts");
      }
    },
    "application/json": (state) => {
      if (Users.getLoggedInUser(state.cookies)) {
        return Contacts.get()
          .then(Message.json);
      }
      else {
        return Message.Unauthorized;
      }
    }
  },
  POST: {
    "*/*": (state) => Contacts.set(state.body).then(Message.noContent)
  },
  DELETE: {
    "*/*": (state) => {
      if (Users.getLoggedInUser(state.cookies)) {
        return Contacts.delete(state.body)
          .then(Message.noContent);
      }
      else {
        return Message.Unauthorized;
      }
    }
  }
};
