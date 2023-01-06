const express = require("express");
const pool = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO sql6587376.emergency_info (employee_id, employee_contact, contact_first_name, contact_last_name, contact_relation, contact_phone_number) VALUES (?,?,?,?,?,?);`,
    [
      req.body.employee_id,
      req.body.employee_contact,
      req.body.contact_first_name,
      req.body.contact_last_name,
      req.body.contact_relation,
      req.body.contact_phone_number,
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
