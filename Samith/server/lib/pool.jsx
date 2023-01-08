const { createPool } = require("mysql");

const dbname = "sql6588944";

const pool = createPool({
  host: "sql6.freemysqlhosting.net",
  user: "sql6588944",
  password: "Ftx9mrBkri",
  database: dbname,
  port: 3306,
  connectionLimit: 50,
});

module.exports = { pool, dbname };
