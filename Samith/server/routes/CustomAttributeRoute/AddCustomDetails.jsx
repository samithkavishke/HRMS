const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  pool.query(
    `Update ${dbname}.custom_attributes SET ${req.body.column} = ?; `,
    [req.body.value],

    (err, rows, field) => {
      if (err) {
        return console.log(err);
      }
      let stringResult = JSON.parse(JSON.stringify(rows));
      const result = stringResult.map((item) => item.COLUMN_NAME);
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
