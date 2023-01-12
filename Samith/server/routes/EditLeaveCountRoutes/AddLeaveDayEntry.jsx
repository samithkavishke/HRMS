const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO ${dbname}.num_days_of_leave (pay_grade, gender, Annual_leave, Maternal_leave,Casual_leave,no_pay_leave) VALUES (?,?,?,?,?,?);`,
    [
      req.body.pay_grade,
      req.body.gender,
      req.body.Annual_leave,
      req.body.Maternal_leave,
      req.body.Casual_leave,
      req.body.no_pay_leave,
    ],
    (err, row, field) => {
      if (err) {
        return console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
});

module.exports = router;
