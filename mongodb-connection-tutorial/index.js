const dbConnection = require("./mongodb.js");

async function getData() {
  let collection = await dbConnection();
  let response = await collection.find({}).toArray();
  console.log(response);
}

getData();
