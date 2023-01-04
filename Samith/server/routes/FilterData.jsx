const express = require("express");
const pool = require("../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

// router.get("/:dept-:pay_grade-:title", (req, res) => {
//   //   console.log(req.params);
//   // let dept_string = "";
//   // let pay_grade_string = "";
//   // let job_title_string = "";

//   // if (req.params.dept === "") {
//   //   dept_string = ` department != "" `;
//   // } else {
//   //   dept_string = ` department = "${req.params.dept}" `;
//   // }

//   // if (req.params.pay_grade === "") {
//   //   pay_grade_string = ` pay_grade != "" `;
//   // } else {
//   //   pay_grade_string = ` pay_grade = "${req.params.pay_grade}" `;
//   // }

//   // if (req.params.title === "") {
//   //   job_title_string = ` job_title != "" `;
//   // } else {
//   //   job_title_string = ` job_title = "${req.params.title}" `;
//   // }
//   // let query_string =
//   //   `SELECT employee_id,job_title,pay_grade,employee_status,contract_period,department FROM sql6587376.employee_work where ` +
//   //   dept_string +
//   //   `and` +
//   //   pay_grade_string +
//   //   `and` +
//   //   job_title_string +
//   //   `;`;
//   let query_string = `SELECT * FROM sql6587376.employee_work`;
//   pool.query(query_string, (err, row, field) => {
//     if (err) {
//       return console.log(err);
//     }
//     let result = JSON.parse(JSON.stringify(row));
//     console.log(result);
//     //   if (result.length > 0) {
//     //     // console.log(result[0].passcode_hash, req.body.password);
//     //     res.send({ result: result, success: true });
//     //     // console.log(result);
//     //   } else {
//     //     res.send({ success: false });
//     //   }
//   });
// });

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
    `SELECT * FROM sql6587376.employee_work where ` +
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
