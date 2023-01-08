const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
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
  //   console.log(req.query);
  pool.query(
    `SELECT * FROM  ${dbname}.leave_application WHERE employee_id = ${req.body.employee_id} and approval_status != 0 and from_date<=${today} and ${today}<=to_date ;`,
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
        res.send({ applicable: true, success: true });
      } else {
        res.send({ applicable: false, success: false });
      }
    }
  );
});

module.exports = router;
