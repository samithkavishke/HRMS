const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `UPDATE ${dbname}.num_days_of_leave SET  Annual_leave = ?,  Maternal_leave = ?, Casual_leave = ?, no_pay_leave = ? WHERE pay_grade = ? and gender = ?;`,
    [
      req.body.Annual_leave,
      req.body.Maternal_leave,
      req.body.Casual_leave,
      req.body.no_pay_leave,
      req.body.pay_grade,
      req.body.gender,
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

//   console.log(req.body.employerID);
//   console.log(req.body);

module.exports = router;
