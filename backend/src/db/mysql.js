const sql = require('mysql2')

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
};

const pool = sql.createPool(config);

module.exports = pool

