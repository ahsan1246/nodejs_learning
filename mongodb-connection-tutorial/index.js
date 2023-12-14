const dbConnection = require("./mongodb.js");

async function getData() {
  // old pattern
  // dbConnection().then((collection) => {
  //   collection.find().toArray().then((data) => {
  //     console.log(data);
  //   });
  // });

  // New way of promises
  let collection = await dbConnection();
  let response = await collection.find({}).toArray();
  console.log(response);
}

getData();
