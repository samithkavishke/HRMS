const express = require("express");
const { pool, dbname } = require("../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";


router.get("/", (req, res) => {
  const dept = req.query.department;
  const grade = req.query.payGrade;
  const title = req.query.jobTitle;
  console.log(grade);
  console.log(title);
  let dept_string;
  if (dept == "None") {
    dept_string = ` department != "None" `;
  } else {
    dept_string = ` department = "${dept}" `;
  }

  if (grade == "None") {
    grade_string = ` pay_grade != "None" `;
  } else {
    grade_string = ` pay_grade = "${grade}" `;
  }

  if (title == "None") {
    title_string = ` job_title != "None" `;
  } else {
    title_string = ` job_title = "${title}" `;
  }

  pool.query(
    `SELECT * FROM ${dbname}.employee_work where ` +
      dept_string +
      ` and ` +
      grade_string +
      ` and ` +
      title_string +
      `;`,
    (err, row, field) => {
      if (err) {
        return console.log(err);
      }
      let result = JSON.parse(JSON.stringify(row));
      // console.log(result);
      res.send({ result: result });
    }
  );
});

module.exports = router;
