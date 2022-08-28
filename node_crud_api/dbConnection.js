const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");

mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database Connected.");
    },
    (error, stacktrace) => {
      console.log("Database cannot be connected, " + error);
    }
  );
