const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  //   console.log(req.query);
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
  console.log();
  console.log(today);

  pool.query(
    `select t1.department,count-COALESCE(no_leaves,0) as no_present , COALESCE(no_leaves,0) as no_leaves,count as total from (SELECT department ,count(employee_id) as count from ${dbname}.employee_work group by department) as t1 left join  (SELECT department,count(${dbname}.leave_application.employee_id) as no_leaves FROM ${dbname}.employee_work join ${dbname}.leave_application WHERE ${dbname}.leave_application.employee_id =  ${dbname}.employee_work.employee_id and approval_status = 1 and from_date<=${today} and ${today}<=to_date group by department ) as t2 on t1.department = t2.department;`,
    [],
    (err, rows, field) => {
      if (err) {
        return console.log(err);
      }

      const result = JSON.parse(JSON.stringify(rows));

      console.log(result);
      //   const today = new Date();

      if (result.length > 0) {
        res.send({ result: result, success: true });
      } else {
        res.send({ success: false });
      }
    }
  );
});

module.exports = router;
