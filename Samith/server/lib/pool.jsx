const { createPool } = require("mysql");
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "jupyter",
  connectionLimit: 10,
});

module.exports = pool;
