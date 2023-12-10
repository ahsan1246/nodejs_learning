import { MongoClient } from "mongodb";
const mongodbUrl = "mongodb://localhost:27017";
const mongodbName = "ecommerce-app";
const mongoClient = new MongoClient(mongodbUrl);

async function getData() {
  let result = await mongoClient.connect();
  let db = result.db(mongodbName);
  let collection = db.collection("products");
  let response = await collection.find({}).toArray();
  console.log(response);
}

getData();
