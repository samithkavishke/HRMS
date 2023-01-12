const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  //   console.log(req.query);
  console.log("hi", req.query);
  console.log(
    `SELECT DISTINCT ` + req.query.field + ` FROM ${dbname}.add_emp_details;`
  );
  pool.query(
    `SELECT DISTINCT ` + req.query.field + ` FROM ${dbname}.add_emp_details;`,

    (err, rows, field) => {
      if (err) {
        return console.log(err);
      }
      let stringResult = JSON.parse(JSON.stringify(rows));
      //   const result = stringResult.values();
      //   console.log("hi", result);
      //   let result = "";
      let result = stringResult.map((item) => item[req.query.field]);
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
