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
      `${req.body.table} ADD ${req.body.column} ${req.body.datatype};`,
    (err, row, field) => {
      if (err) {
        return console.log(err);
      } else {
        // console.log(row)
        res.send({ success: true });
      }
    }
  );
});

//   console.log(req.body.employerID);
//   console.log(req.body);

module.exports = router;
