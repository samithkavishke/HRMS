const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  //   console.log(req.query);
  pool.query(
    `SELECT ${dbname}.employee_personal.employee_id as employee_id,first_name,last_name,pay_grade,employee_status,contract_period,department FROM ${dbname}.subordinates JOIN ${dbname}.employee_personal on ${dbname}.employee_personal.employee_id = subordinate_id JOIN ${dbname}.employee_work on ${dbname}.employee_work.employee_id = subordinate_id where supervisor_id = ?;`,
    [req.query.employee_id],

    (err, rows, field) => {
      if (err) {
        return console.log(err);
      }
      let result = JSON.parse(JSON.stringify(rows));
      //   const result = stringResult.map((item) => item.COLUMN_NAME);
      // console.log(result);
      //   let result = "";
      //   let result = stringResult.map((item) => item.Tables_in_sql6587376);
      if (result.length > 0) {
        res.send({ result: result, success: true });
      } else {
        res.send({ success: false });
      }
    }
  );
});

module.exports = router;
