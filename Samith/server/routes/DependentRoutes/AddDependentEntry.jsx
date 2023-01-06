const express = require("express");
const pool = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO sql6587376.dependent (dependent_id, employee_id, first_name, last_name) VALUES (?,?,?,?);`,
    [
      req.body.dependent_id,
      req.body.employee_id,
      req.body.first_name,
      req.body.last_name,
    ],
    (err, row, field) => {
      if (err) {
        return console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
  // console.log(req.body.employerID);
  // console.log(req.body);
});

module.exports = router;
