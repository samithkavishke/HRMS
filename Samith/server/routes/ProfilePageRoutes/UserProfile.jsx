const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/:id", (req, res) => {
  //   console.log(req.params);
  pool.query(
    `SELECT first_name,last_name,address_line1,address_line2,town,birth_year,birth_month,birth_date,marital_status,gender FROM ${dbname}.employee_personal WHERE employee_id = "${req.params.id}";`,
    (err, row, field) => {
      if (err) {
        return console.log(err);
      }
      let result = JSON.parse(JSON.stringify(row));
      console.log(result);
      if (result.length > 0) {
        // console.log(result[0].passcode_hash, req.body.password);
        res.send({ result: result, success: true });
        // console.log(result);
      } else {
        res.send({ success: false });
      }
    }
  );
});

module.exports = router;
