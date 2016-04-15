"use strict";

var Message = require("../Message.js"),
  Users = require("../data/Users.js");

module.exports = {
  URLPattern: /^\/users(?:\/|\.html)?$/,
  GET: {
    "text/html": (state) => {
      if (Users.getLoggedInUser(state.cookies)) {
        return Message.file("./users.html");
      }
      else {
        return Message.redirect("/login?return=users");
      }
    },
    "application/json": (state) => {
      if (Users.getLoggedInUser(state.cookies)) {
        return Users.search()
          .then((users) => users.map((user) => {
            return {
              name: user.name,
              isLoggedIn: user.token && user.token !== "logged-out"
            };
          }))
          .then(Message.json);
      }
      else {
        return Message.Unauthorized;
      }
    }
  },
  DELETE: {
    "*/*": (state) => {
      if (Users.getLoggedInUser(state.cookies)) {
        return Users.delete(state.body)
          .then(Message.noContent);
      }
      else {
        return Message.Unauthorized;
      }
    }
  }
};
