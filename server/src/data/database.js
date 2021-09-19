const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "todo",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();