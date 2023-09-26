const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  //   console.log(req.query);

  const status = req.query.status;
  // console.log(req.query);
  console.log(req.query, req.query.employee_id);
  let status_query = status == "NULL" ? " is NULL" : "=" + status;

  pool.query(
    `SELECT * FROM ${dbname}.leave_application join ${dbname}.subordinates where subordinate_id = employee_id and supervisor_id = ? and approval_status${status_query} `,
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
