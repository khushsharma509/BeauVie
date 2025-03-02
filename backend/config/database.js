const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// test the connection
pool.getConnection((err, connection) => {
    if(err) console.log("Database connection error:", err);
    else {
        console.log("Successfully connected to database");
        connection.release();
    }
})

module.exports = pool.promise();
