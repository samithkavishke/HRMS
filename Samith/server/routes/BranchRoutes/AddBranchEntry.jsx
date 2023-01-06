const express = require("express");
const pool = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO sql6587376.branch_info (branch_code, branch_name, address_line1, address_line2, town, reg_number) VALUES (?,?,?,?,?,?);`,
    [
      req.body.branch_code,
      req.body.branch_name,
      req.body.address_line1,
      req.body.address_line2,
      req.body.town,
      req.body.reg_number,
    ],
    (err, row, field) => {
      if (err) {
        return console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
  console.log(req.body.employerID);
  console.log(req.body);
});

module.exports = router;
