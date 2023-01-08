const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

let employee_id = "";

router.get("/", (req, res) => {
  // let result1 = [];
  // console.log(req.params.employee_id);
  const employee_id = req.query.employee_id;
  pool.query(
    `SELECT job_title, pay_grade, employee_status, contract_period, department FROM ${dbname}.employee_work where employee_id =  ` +
      `"${employee_id}"` +
      `;`,
    (err, row1, field) => {
      if (err) {
        return console.log(err);
      }
      pool.query(
        `SELECT first_name, last_name, address_line1, address_line2, town, birth_year, birth_month, birth_date, marital_status, gender FROM ${dbname}.employee_personal where employee_id =  ` +
          `"${employee_id}"` +
          `;`,
        (err, row2, field) => {
          if (err) {
            return console.log(err);
          }
          pool.query(
            `SELECT employee_contact, contact_first_name, contact_last_name, contact_relation, contact_phone_number FROM ${dbname}.emergency_info where employee_id =  ` +
              `"${employee_id}"` +
              `;`,
            (err, row3, field) => {
              if (err) {
                return console.log(err);
              }
              let result1 = JSON.parse(JSON.stringify(row1));
              let result2 = JSON.parse(JSON.stringify(row2));
              let result3 = JSON.parse(JSON.stringify(row3));

              let result = result1.concat(result2, result3);
              if (result.length == 0) {
                return res.send({ success: false });
              }
              // console.log(result);
              return res.send({ result: result, success: true });
            }
          );
        }
      );
    }
  );
});

module.exports = router;
