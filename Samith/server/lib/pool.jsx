const { createPool } = require("mysql");
const pool = createPool({
  host: "sql6.freemysqlhosting.net",
  user: "sql6587376",
  password: "MQ8xrwNjKu",
  database: "sql6587376",
  port: 3306,
  connectionLimit: 10,
});

module.exports = pool;
