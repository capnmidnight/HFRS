"use strict";

var crypto = require("crypto"),
  db = require("./db.js"),
  ready = db.table("users"),
  trans = {
    "name": "PartitionKey"
  },
  untrans = {
    "PartitionKey": "name"
  };

function makeNewSalt() {
  var bytes = crypto.randomBytes(256);
  var salt = "";
  for (var i = 0; i < bytes.length; ++i) {
    salt += bytes[i].toString(16);
  }
  return salt;
}

function getUser(userName) {
  return ready
    .then(() => db.get("users", userName, ""))
    .then((ent) => db.unwrap(untrans, ent));
}

function getAllUsers() {
  return ready
    .then(() => db.search("users"))
    .then((users) => users.entries.map(db.unwrap.bind(db, untrans)));
}

function findUser(cookies) {
  var token = getCookie(cookies, "token");
  if (token !== null && token !== undefined) {
    return getAllUsers()
      .then((users) => users.filter((u) => u.token === token)[0]);
  }
}

function setUser(user) {
  return ready
    .then(() => db.wrap(trans, user))
    .then((ent) => db.set("users", ent));
}

function getCookie(cookies, name) {
  var vals = cookies.map((c) => c[name]).filter((s) => s);
  return vals[0];
}

module.exports = {
  isAuthorized: findUser,

  logout: (cookies) => findUser(cookies)
    .then((user) => {
      if (user) {
        user.token = "logged-out";
        return setUser(user);
      }
    }),

  get: getUser,

  getAll: getAllUsers,

  getSalt: (userName) => getUser(userName)
    .catch((err) => {
      if (process.env.NODE_ENV === "dev" && err.statusCode === 404) {
        var salt = makeNewSalt(),
          user = {
            name: userName,
            RowKey: "",
            salt: salt
          };
        return setUser(user).then(() => user);
      }
      else {
        console.error("Error getting user salt value", err);
        throw err;
      }
    })
    .then((user) => {
      return user.salt
    }),

  delete: (obj) => ready
    .then(() => db.delete("users", obj.name, "")),

  authenticate: (userName, hash) => getUser(userName)
    .then((user) => {
      if (hash) {
        if (user.hash !== hash && process.env.NODE_ENV === "dev") {
          user.hash = hash;
        }

        if (user.hash === hash) {
          user.token = makeNewSalt();
          return setUser(user).then(() => user);
        }
      }
    })
};