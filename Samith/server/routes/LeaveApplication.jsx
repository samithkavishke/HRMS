const express = require("express");
const pool = require("../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO jupyter.leave_application(employee_id,leave_type,from_date,to_date,approval_status) VALUES (?,?,?,?,?);`,
    [
      req.body.employerID,
      req.body.leaveType,
      req.body.fromValue.split("T")[0],
      req.body.toValue.split("T")[0],
      "0",
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
