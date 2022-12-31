const express = require("express");
const pool = require("../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.get("/", (req, res) => {
  pool.query(
    `SELECT first_name,last_name,address_line1,address_line2,town,birth_year,birth_month,birth_date,marital_status,gender FROM sql6587376.user_info WHERE username = "${req.body.username}";`,
    (err, row, field) => {
      if (err) {
        return console.log(err);
      }
      let result = JSON.parse(JSON.stringify(row));
      if (result.length > 0) {
        console.log(result[0].passcode_hash, req.body.password);

        if (result[0].passcode_hash == req.body.password) {
          console.log("ado hri");
          res.send({ success: true });
        } else {
          res.send({ success: false });
        }
      } else {
        res.send({ success: false });
      }
    }
  );
});

module.exports = router;
