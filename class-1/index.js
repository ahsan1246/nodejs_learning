const express = require("express");
require("./dbConnection");

const app = express();

app.use(express.json());
app.use('/api', require('./routes/api'));
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 4000, function () {
  console.log("Now listening for request at port => " + process.env.port);
});
