const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  const dept = req.query.department;
  const grade = req.query.payGrade;
  const title = req.query.jobTitle;
  const field = req.query.field;
  const attribute = req.query.attribute;

  console.log(attribute);

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

  if (field !== "None" && attribute !== "None") {
    custom_string = `and  ${field} = "${attribute}" `;
  } else {
    custom_string = ` `;
  }

  pool.query(
    `SELECT * FROM ${dbname}.employee_work join ${dbname}.add_emp_details on ${dbname}.employee_work.employee_id = ${dbname}.add_emp_details.employee_id where ` +
      dept_string +
      ` and ` +
      grade_string +
      ` and ` +
      title_string +
      custom_string +
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
