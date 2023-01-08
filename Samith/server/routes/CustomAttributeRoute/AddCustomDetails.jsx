const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.post("/", (req, res) => {
  // console.log(
  //   `Update ${dbname}.add_emp_details SET ${req.body.column} = "${req.body.value}" WHERE employee_id = ${req.body.employee_id}; `
  // );
  pool.query(
    `SELECT * FROM ${dbname}.add_emp_details WHERE employee_id = ${req.body.employee_id}; `,

    (err, rows, field) => {
      if (err) {
        return console.log(err);
      }
      if (rows.length > 0) {
        pool.query(
          `Update ${dbname}.add_emp_details SET ${req.body.column} = "${req.body.value}" WHERE employee_id = ${req.body.employee_id}; `,

          (err, rows, field) => {
            if (err) {
              return console.log(err);
            }
            // return res.send({ success: true });
          }
        );
      } else {
        pool.query(
          `INSERT INTO ${dbname}.add_emp_details (employee_id, ${req.body.column}) VALUES (?,?);`,
          [req.body.employee_id, req.body.value],
          (err, rows, field) => {
            if (err) {
              return console.log(err);
            }
            // return res.send({ success: true });
          }
        );
      }
      return res.send({ success: false });
    }
  );
});

module.exports = router;
