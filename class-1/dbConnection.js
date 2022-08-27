const mongoose = require("mongoose");
const envFile = require("dotenv");

envFile.config();

mongoose.connect(process.env.dbUrl);
mongoose.Promise = global.Promise;
