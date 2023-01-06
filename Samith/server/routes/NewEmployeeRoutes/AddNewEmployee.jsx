const express = require("express");
const pool = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO sql6587376.employee_work (employee_id, job_title, pay_grade, employee_status, contract_period, department) VALUES (?,?,?,?,?,?);`,
    [
      req.body.employee_id,
      req.body.job_title,
      req.body.pay_grade,
      req.body.employee_status,
      req.body.contract_period,
      req.body.department,
    ],
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
