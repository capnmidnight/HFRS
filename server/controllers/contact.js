var azure = require("azure-storage"),
  ent = azure.TableUtilities.entityGenerator,
  tables = null;

if (process && process.env && process.env.NODE_ENV === "dev") {
  var secrets = require("./secrets");
  console.log("running DEV database", secrets);
  tables = azure.createTableService(secrets.connectionString);
}
else {
  tables = azure.createTableService();
}

tables.createTableIfNotExists("contacts", function (error, result, response) {
  if (error) {
    console.error(error);
  }
  else if (result.created) {
    console.warn("Had to create the contacts table!");
  }
  else {
    console.log("Contacts table already exists.");
  }
});

var trans = {
  "name": "PartitionKey",
  "email": "RowKey"
};

function makeEntity(body) {
  var obj = {};
  for (var k in body) {
    if (body[k] !== null && body[k] !== undefined) {
      obj[trans[k] || k] = ent.String(body[k]);
    }
  }
  return obj;
}

module.exports = {
  pattern: /^\/contacts\/?$/,
  GET: function (params, sendData, serverError) {
    tables.queryEntities("contacts", null, null, function (err, res) {
      if (err) {
        console.error("contacts.queryEntities:", err);
        serverError(500);
      }
      else {
        sendData("application/json", JSON.stringify(res));
      }
    });
  },
  POST: function (params, sendData, serverError, body) {
    tables.insertOrMergeEntity("contacts", makeEntity(body), function (err, res) {
      if (err) {
        console.error("contacts.insertOrMergeEntity:", err);
        serverError(500);
      }
      else {
        sendData("application/json", JSON.stringify({
          status: "success",
          message: res
        }));
      }
    });
  }
};
