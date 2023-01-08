const express = require("express");
const pool = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO ${dbname}.basic_salary (pay_grade, job_title, salary) VALUES (?,?,?);`,
    [req.body.pay_grade, req.body.job_title, req.body.salary],
    (err, row, field) => {
      if (err) {
        return console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
  console.log(req.body.employerID);
  console.log(req.body);
});

module.exports = router;
