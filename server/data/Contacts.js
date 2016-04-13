var db = require("./db.js"),
  ready = db.table("contacts"),
  trans = {
    "name": "PartitionKey",
    "email": "RowKey"
  },
  untrans = {
    "PartitionKey": "name",
    "RowKey": "email"
  };

module.exports = {
  set: (obj) => ready
    .then(() => {
      return db.set("contacts", db.wrap(trans, obj))
    }),

  get: (partitionKey, rowKey) => ready
    .then(() => db.search("contacts", partitionKey, rowKey))
    .then((contacts) => contacts.entries.map(db.unwrap.bind(db, untrans)))
};