"use strict";

var azure = require("azure-storage"),
  Message = require("../Message.js"),
  ent = azure.TableUtilities.entityGenerator,
  escape = require("escape-html"),
  tables = azure.createTableService(process.env.NODE_ENV === "dev" && require("./secrets").connectionString || null);

tables = require("../promisify.js")(tables);

var tablesReady = tables.createTableIfNotExists("users")
  .then(console.log.bind(console, "OK for users"));

var trans = {
  "name": "PartitionKey"
},
  retrans = Object.keys(trans).reduce((obj, k) => (obj[trans[k]] = k, obj), {});

function makeEntity(body) {
  var obj = {};
  for (var k in body) {
    if (body[k] !== null && body[k] !== undefined) {
      obj[trans[k] || k] = ent.String(body[k]);
    }
  }
  obj.RowKey = ent.String(0);
  return obj;
}

module.exports = {
  pattern: /^\/(login|salt)(?:\?return=(\w+))?$/,
  GET: function (cmd, redir, state) {
    if (state && state.cookies && state.cookies.token) {
      return Message.redirect("index.html");
    }
    else if (cmd === "login") {
      return Message.file("./login.html");
    }
    else {
      return Message.methodNotAllowed("/" + cmd);
    }
  },
  POST: function (cmd, redir, state) {
    if (cmd === "salt") {
      return tablesReady.then(() => tables.queryEntities("users", ent.String(state.body.name), ent.String(0)))
        .then((obj) => {
          console.log(obj);
          return Message.OK;
        });
    }
    else {
      return Message.methodNotAllowed("/" + cmd);
    }
  }
};
