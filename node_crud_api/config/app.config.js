const envFile = require("dotenv");

envFile.config();

const MONGO_DB_CONFIG = {
  DB: process.env.dbUrl,
};

module.exports = {
  MONGO_DB_CONFIG,
};
