var db = require("./db.js");

db.define("contacts", [
  ["name", "PartitionKey", "String"],
  ["email", "RowKey", "String"],
  ["date", "Timestamp", "Date"]
]);

module.exports = {
  set: (obj) => db.set("contacts", obj),

  get: (partitionKey, rowKey) => db.search("contacts", partitionKey, rowKey),

  delete: (obj) => db.delete("contacts", obj.name, obj.email)
};