var azure = require("azure-storage"),
  tables = azure.createTableService(process.env.NODE_ENV === "dev" && require("./secrets").connectionString || null),
  ent = azure.TableUtilities.entityGenerator;

module.exports = {

  azure: azure,
  tables: tables,
  ent: ent,

  wrap: function (trans, obj1) {
    var obj2 = {};
    for (var k in obj1) {
      if (obj1[k] !== null && obj1[k] !== undefined) {
        obj2[trans[k] || k] = ent.String(obj1[k]);
      }
    }
    return obj2;
  },

  unwrap: function (untrans, obj1) {
    var obj2 = {};
    for (var k in obj1) {
      if (obj1[k] !== null && obj1[k] !== undefined) {
        var value = obj1[k]._;
        obj2[untrans[k] || k] = value;
      }
    }
    return obj2;
  },

  table: (name) => new Promise((resolve, reject) =>
    tables.createTableIfNotExists(name,
      (err, state) => err && reject(err) || resolve(state))),

  set: (table, ent) => new Promise((resolve, reject) =>
    tables.insertOrMergeEntity(table, ent,
      (err, state) => err && reject(err) || resolve(state))),

  get: (table, partitionKey, rowKey) => new Promise((resolve, reject) => {
    return tables.retrieveEntity(table, partitionKey, rowKey,
      (err, state) => err && reject(err) || resolve(state))
  }),

  search: (table, partitionKey, rowKey) => new Promise((resolve, reject) => {
    var query = new azure.TableQuery(),
      m = "where";
    if (partitionKey) {
      query = query.where("PartitionKey eq ?", partitionKey);
      m = "and";
    }
    if (rowKey) {
      query = query[m]("RowKey eq ?", rowKey);
    }
    tables.queryEntities(table, query, null,
      (err, state) => err && reject(err) || resolve(state));
  })
};