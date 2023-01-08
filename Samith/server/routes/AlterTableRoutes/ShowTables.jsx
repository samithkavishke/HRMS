const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  //   console.log(req.params);
  pool.query(`SHOW TABLES FROM ${dbname};`, (err, rows, field) => {
    if (err) {
      return console.log(err);
    }
    let stringResult = JSON.parse(JSON.stringify(rows));
    let result = stringResult.map((item) => item.Tables_in_sql6587376);
    // console.log(exportResult);
    if (result.length > 0) {
      // console.log(result[0].passcode_hash, req.body.password);
      res.send({ result: result, success: true });
      // console.log(result);
    } else {
      res.send({ success: false });
    }
  });
});

module.exports = router;
