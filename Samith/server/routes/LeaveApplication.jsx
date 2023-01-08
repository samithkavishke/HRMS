const express = require("express");
const { pool, dbname } = require("../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `SELECT ${req.body.leaveType} FROM ` +
      `(SELECT * FROM sql6588944.num_days_of_leave) as t1 join ` +
      `(SELECT gender,pay_grade,sql6588944.employee_work.employee_id FROM sql6588944.employee_work join sql6588944.employee_personal using (employee_id) ) as t2 ` +
      `where t1.pay_grade = t2.pay_grade and t1.gender = t2.gender and t2.employee_id = ?;`,
    [req.body.employerID],
    (err, row1, field) => {
      if (err) {
        return console.log(err);
      }
      const result1 = JSON.parse(JSON.stringify(row1));
      pool.query(
        `SELECT employee_id,leave_type,sum(DATEDIFF(to_date,from_date)+1)as total FROM sql6588944.leave_application where approval_status = 1 and employee_id = ? and leave_type = ?;`,
        [req.body.employerID, req.body.leaveType],
        (err, row2, field) => {
          if (err) {
            return console.log(err);
          }
          const result2 = JSON.parse(JSON.stringify(row2));
          // const leave_type = req.body.leaveType;
          var values = Object.keys(result1[0]).map(function (key) {
            return result1[0][key];
          });
          console.log(result1, result2);
          const total_valid_leaves = values[0];
          const total_taken = result2[0].total;
          const remain = total_valid_leaves - total_taken;
          console.log(remain);

          const _MS_PER_DAY = 1000 * 60 * 60 * 24;
          const from_date = new Date(req.body.fromValue);
          const to_date = new Date(req.body.toValue);

          const askdates_in_ms = to_date - from_date;
          const asknodays = askdates_in_ms / _MS_PER_DAY + 1;
          console.log(from_date, to_date);
          console.log(asknodays);
          console.log(remain > asknodays);
          if (remain > asknodays) {
            const asking_days = pool.query(
              `INSERT INTO ${dbname}.leave_application(employee_id,leave_type,from_date,to_date) VALUES (?,?,?,?);`,
              [
                req.body.employerID,
                req.body.leaveType,
                req.body.fromValue.split("T")[0],
                req.body.toValue.split("T")[0],
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
          }
        }
      );
    }
  );
});
module.exports = router;
