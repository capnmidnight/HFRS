"use strict";

var Message = require("../Message.js"),
  Users = require("../data/Users.js"),
  expireNow = new Date(0).toGMTString();

module.exports = {
  URLPattern: /^\/(login(?:\/?|.html?)|logout|salt|hash)(?:\?return=(\w+))?$/,
  GET: {
    "text/html": function (cmd, redir, state) {
      if (Users.isAuthorized(state.cookies) && cmd !== "logout") {
        return Message.redirect("index.html");
      }
      else if (cmd === "logout") {
        return Users.logout(state.cookies)
          .then(() => Message.redirect("/login")
            .cookie({ token: "", Expires: expireNow }));
      }
      else if (cmd === "login") {
        return Message.file("./login.html");
      }
      else {
        return Message.MethodNotAllowed;
      }
    }
  },
  POST: {
    "text/plain": function (cmd, redir, state) {
      if (Users.isAuthorized(state.cookies) || (cmd !== "salt" && cmd !== "hash")) {
        return Message.MethodNotAllowed;
      }
      else if (cmd === "salt") {
        return Users.getSalt(state.body.name)
          .then(Message.text);
      }
      else if (cmd === "hash")
        return Users.authenticate(state.body.name, state.body.hash)
          .then((user) => {
            if (user) {
              return Message.noContent()
                .cookie({
                  token: user.token,
                  Expires: new Date(Date.now() + 60 * 60 * 1000).toGMTString()
                });
            }
            else {
              return Message.Unauthorized;
            }
          });
    }
  }
};
