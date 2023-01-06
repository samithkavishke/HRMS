const express = require("express");
const pool = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `UPDATE sql6587376.dependent SET  employee_id = ?,  first_name = ?, last_name = ? WHERE dependent_id = ?;`,
    [
      req.body.employee_id,
      req.body.first_name,
      req.body.last_name,
      req.body.dependent_id,
    ],
    (err, row, field) => {
      if (err) {
        return console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
});

//   console.log(req.body.employerID);
//   console.log(req.body);

module.exports = router;
