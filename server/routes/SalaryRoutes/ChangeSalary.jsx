const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `UPDATE ${dbname}.basic_salary SET pay_grade = ?, job_title = ?,  salary = ? WHERE pay_grade = ? AND job_title = ? ;`,
    [
      req.body.pay_grade,
      req.body.job_title,
      req.body.salary,
      req.body.pre_pay_grade,
      req.body.pre_job_title,
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
