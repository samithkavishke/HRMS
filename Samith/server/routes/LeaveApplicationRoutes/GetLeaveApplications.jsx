const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  //   console.log(req.query);
  pool.query(
    `SELECT * FROM ${dbname}.leave_application `,

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