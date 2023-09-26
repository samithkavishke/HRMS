const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  console.log("Applicable.jsx is Running");
  // console.log(req.body.employee_id, req.query.employee_id);
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  let month = todayDate.getMonth() + 1;
  let day = todayDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  const today = `${year}${month}${day}`;
  // console.log(today);
  let leaves_taken = {
    Maternal_leave: 0,
    no_pay_leave: 0,
    Annual_leave: 0,
    Casual_leave: 0,
  };

  pool.query(
    `SELECT * FROM  ${dbname}.leave_application WHERE employee_id = ${req.query.employee_id} and approval_status != 0 and  ${today}<=to_date  ;`,
    (err, rows, field) => {
      if (err) {
        return console.log(err);
      }
      pool.query(
        `SELECT * FROM (SELECT * FROM ${dbname}.num_days_of_leave) as t1 join (SELECT gender,pay_grade,${dbname}.employee_work.employee_id FROM ${dbname}.employee_work join ${dbname}.employee_personal using (employee_id) ) as t2 where t1.pay_grade = t2.pay_grade and t1.gender = t2.gender and t2.employee_id = ?;`,
        [req.query.employee_id],
        (err, row1, field) => {
          if (err) {
            return console.log(err);
          }
          pool.query(
            `SELECT leave_type,sum(DATEDIFF(to_date,from_date)+1)as total FROM ${dbname}.leave_application where approval_status = 1 and employee_id = ? group by leave_type ;`,
            [req.query.employee_id],
            (err, row2, field) => {
              if (err) {
                return console.log(err);
              }
              let result = JSON.parse(JSON.stringify(rows));
              let result1 = JSON.parse(JSON.stringify(row1));
              console.log(result1);
              let result2 = JSON.parse(JSON.stringify(row2));
              // console.log(result2);

              for (let i = 0; i < result2.length; i++) {
                leaves_taken[result2[i].leave_type] = result2[i].total;
              }
              let remain_leaves = {};
              for (var key of Object.keys(leaves_taken)) {
                remain_leaves[key] = result1[0][key] - leaves_taken[key];
              }
              console.log(leaves_taken);
              console.log(remain_leaves);

              // console.log(result);
              //   const result = stringResult.map((item) => item.COLUMN_NAME);
              // console.log(result);
              //   let result = "";
              //   let result = stringResult.map((item) => item.Tables_in_sql6587376);
              // console.log(result);
              let form_status = "Pending";
              if (result.length > 0) {
                if (result[0].approval_status == 1) {
                  form_status = "Approved";
                }
                res.send({
                  status: form_status,
                  applicable: false,
                  remain_leaves: remain_leaves,
                  success: true,
                });
              } else {
                res.send({
                  applicable: true,
                  success: true,
                  remain_leaves: remain_leaves,
                });
              }
            }
          );
        }
      );
    }
  );
});
module.exports = router;
