"use strict";

var azure = require("azure-storage"),
  Message = require("../Message.js"),
  ent = azure.TableUtilities.entityGenerator,
  escape = require("escape-html"),
  tables = azure.createTableService(process.env.NODE_ENV === "dev" && require("./secrets").connectionString || null);

tables = require("../promisify.js")(tables);

var tablesReady = tables.createTableIfNotExists("contacts")
  .then(console.log.bind(console, "OK for contacts"));

var trans = {
  "name": "PartitionKey",
  "email": "RowKey"
},
  retrans = Object.keys(trans).reduce((obj, k) => (obj[trans[k]] = k, obj), {});

function makeEntity(body) {
  var obj = {};
  for (var k in body) {
    if (body[k] !== null && body[k] !== undefined) {
      obj[trans[k] || k] = ent.String(body[k]);
    }
  }
  return obj;
}

function json2html(obj) {
  var html = "<!DOCTYPE html><html><head><title>CONTACTS</title></head><body><table><thead><tr>",
    ents = obj.entries,
    columns = {},
    i, columnName;
  for (i = 0; i < ents.length; ++i) {
    var entity = ents[i];
    for (columnName in entity) {
      if (!columns[columnName]) {
        columns[columnName] = [];
      }
      columns[columnName][i] = entity[columnName]._;
    }
  }
  for (columnName in columns) {
    html += "<th>" + (retrans[columnName] || columnName) + "</th>";
  }
  html += "</tr></thead><tbody>";
  for (i = 0; i < ents.length; ++i) {
    html += "<tr>";
    for (columnName in columns) {
      html += "<td>" + escape(columns[columnName][i]) + "</td>";
    }
    html += "</tr>";
  }
  html += "</tbody></table></body></html>";
  return html;
}

module.exports = {
  pattern: /^\/contacts\/?$/,
  GET: function (state) {
    if (!state || !state.cookies || !state.cookies.token) {
      return Promise.resolve(Message.redirect("/login?return=contacts"));
    }
    else {
      return tablesReady.then(() => tables.queryEntities("contacts", null, null))
        .then(json2html)
        .then(Message.html);
    }
  },
  POST: function (state) {
    return tablesReady.then(() => tables.insertOrMergeEntity("contacts", makeEntity(state.body)))
      .then(Message.json);
  }
};
