const config = require("../config");
const { mountUri } = require("../controller/health");

const db = require("knex")({
    client: "pg",
    version: "15.3",
    connection: {
        host: config.DB.HOST,
        port: config.DB.PORT,
        user: config.DB.USER,
        password: config.DB.PW,
        database: config.DB.NAME,
        ssl: false
    }
});

module.exports = db;