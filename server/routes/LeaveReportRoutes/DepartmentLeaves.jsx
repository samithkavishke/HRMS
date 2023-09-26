const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  //   console.log(req.query);
  // const Value = new Date();
  function changeDate(value) {
    const Value = new Date(value);
    const year = Value.getFullYear();
    let month = Value.getMonth() + 1;
    let day = Value.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    const date = `${year}${month}${day}`;
    // console.log();
    // console.log(today);
    return date;
  }
  console.log(req.query);
  const from_date = changeDate(req.query.fromValue);
  const to_date = changeDate(req.query.toValue);
  const string_query = `select t1.department,count-COALESCE(no_leaves,0) as no_present , COALESCE(no_leaves,0) as no_leaves,count as total from (SELECT department ,count(employee_id) as count from ${dbname}.employee_work group by department) as t1 left join  (SELECT Count(employee_id) as no_leaves,department FROM (SELECT distinct ${dbname}.employee_work.employee_id,department FROM ${dbname}.employee_work join ${dbname}.leave_application WHERE ${dbname}.leave_application.employee_id =  ${dbname}.employee_work.employee_id and approval_status = 1 and ((${from_date}<=from_date and from_date <=${to_date}) or  (${from_date}<= to_date and to_date <=${to_date} ))) as t3 group by department ) as t2 on t1.department = t2.department;`;
  console.log(string_query)
  pool.query(string_query,
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
