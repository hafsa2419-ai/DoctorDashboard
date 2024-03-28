const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    password: "hafsa123",
    host: "localhost",
    port: 5432,
    database: "medecin"
});

module.exports = pool;
