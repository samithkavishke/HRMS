const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  const pay_grade = req.query.pay_grade;

  let query_string = "";
  if (pay_grade === "Level 1") {
    query_string = ` pay_grade = "Level 2" or pay_grade = "Level 3";`;
  } else if (pay_grade === "Level 2") {
    query_string = ` pay_grade = "Level 2" or pay_grade = "Level 3";`;
  } else if (pay_grade === "Level 3") {
    query_string = ` pay_grade = "Level 3";`;
  }
  pool.query(
    `SELECT employee_id FROM ${dbname}.employee_work WHERE ` + query_string,

    (err, rows, field) => {
      if (err) {
        return console.log(err);
      }
      let stringResult = JSON.parse(JSON.stringify(rows));
      //   const result = stringResult.values();
      //   console.log("hi", result);
      //   let result = "";
      let result = stringResult.map((item) => item.employee_id);
      console.log(result);
      if (result.length > 0) {
        res.send({ result: result, success: true });
      } else {
        res.send({ success: false });
      }
    }
  );
});

module.exports = router;
