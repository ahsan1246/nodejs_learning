const envFile = require("dotenv");

envFile.config();

const MONGO_DB_CONFIG = {
    DB: process.env.dbUrl,
    PAGE_SIZE: 10,
}

module.exports = {
    MONGO_DB_CONFIG,
}