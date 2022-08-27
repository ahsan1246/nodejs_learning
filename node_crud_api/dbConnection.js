const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");

mongoose.connect(process.env.dbUrl);
mongoose.Promise = global.Promise;