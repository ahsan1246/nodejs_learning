const { MongoClient } = require("mongodb");
const mongodbUrl = "mongodb://localhost:27017";
const mongodbName = "ecommerce-app";
const mongoClient = new MongoClient(mongodbUrl);

async function dbConnection() {
  let result = await mongoClient.connect();
  let db = result.db(mongodbName);
  return db.collection("products");
}

module.exports = dbConnection;
