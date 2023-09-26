const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO ${dbname}.employee_personal (employee_id, first_name, last_name, address_line1, address_line2, town, birth_year, birth_month, birth_date, marital_status, gender) VALUES (?,?,?,?,?,?,?,?,?,?,?);`,
    [
      req.body.employee_id,
      req.body.first_name,
      req.body.last_name,
      req.body.address_line1,
      req.body.address_line2,
      req.body.town,
      req.body.birth_year,
      req.body.birth_month,
      req.body.birth_date,
      req.body.marital_status,
      req.body.gender,
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
