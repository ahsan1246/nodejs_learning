const express = require("express");
const app = express();

require("./db.connection");

const envFile = require("dotenv");
envFile.config();

const errors = require("./middleware/errors");
const swaggerUI = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.port || 4000, () => {
  console.log("Ready To GO on port: " + process.env.port || 4000);
});
