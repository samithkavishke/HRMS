const { createPool } = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT,
  connectionLimit: 50,
});

module.exports = { pool, dbname: process.env.DB_NAME };
