const express = require("express");
require("./dbConnection");
const errors = require("./middleware/errors");

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);

app.listen(process.env.port || 4000, function () {
  console.log("Now listening for request at port => " + process.env.port);
});
