const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
router.post("/", (req, res) => {
  //   let password_hash = "";
  //   console.log(req);

  pool.query(
    `ALTER TABLE ${dbname}.` +
      `add_emp_details ADD ${req.body.column} ${req.body.datatype};`,
    (err, row, field) => {
      if (err) {
        return console.log(err);
      }
      pool.query(
        `INSERT INTO ${dbname}.custom_attributes (field_name, data_type) VALUES (?,?);`,
        [req.body.column, req.body.datatype],
        (err, row, field) => {
          if (err) {
            return console.log(err);
          } else {
            res.send({ success: true });
          }
        }
      );
    }
  );
});

module.exports = router;
