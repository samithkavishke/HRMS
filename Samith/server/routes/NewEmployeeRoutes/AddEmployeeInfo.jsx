const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  const workerData = req.body.workerData;
  const personalData = req.body.personalData;
  const emergencyData = req.body.emergencyData;
  const dependantData = req.body.dependantData;

  pool.query(
    `INSERT INTO ${dbname}.employee_work (employee_id, job_title, pay_grade, employee_status, contract_period, department) VALUES (?,?,?,?,?,?);`,
    [
      workerData.employee_id,
      workerData.job_title,
      workerData.pay_grade,
      workerData.employee_status,
      workerData.contract_period,
      workerData.department,
    ],
    (err, row, field) => {
      if (err) {
        return console.log(err);
      }
      pool.query(
        `INSERT INTO ${dbname}.employee_personal (employee_id, first_name, last_name, address_line1, address_line2, town, birth_year, birth_month, birth_date, marital_status, gender) VALUES (?,?,?,?,?,?,?,?,?,?,?);`,
        [
          personalData.employee_id,
          personalData.first_name,
          personalData.last_name,
          personalData.address_line1,
          personalData.address_line2,
          personalData.town,
          personalData.birth_year,
          personalData.birth_month,
          personalData.birth_date,
          personalData.marital_status,
          personalData.gender,
        ],

        (err, row, field) => {
          if (err) {
            return console.log(err);
          }
          pool.query(
            `INSERT INTO ${dbname}.emergency_info (employee_id, employee_contact, contact_first_name, contact_last_name, contact_relation, contact_phone_number) VALUES (?,?,?,?,?,?);`,
            [
              emergencyData.employee_id,
              emergencyData.employee_contact,
              emergencyData.contact_first_name,
              emergencyData.contact_last_name,
              emergencyData.contact_relation,
              emergencyData.contact_phone_number,
            ],

            (err, row, field) => {
              if (err) {
                return console.log(err);
              }
              pool.query(
                `INSERT INTO ${dbname}.dependent (dependent_id, employee_id, first_name, last_name) VALUES (?,?,?,?);`,
                [
                  dependantData.dependent_id,
                  dependantData.employee_id,
                  dependantData.first_name,
                  dependantData.last_name,
                ],
                (err, row, field) => {
                  if (err) {
                    return console.log(err);
                  } else {
                    return res.send({ success: true });
                  }
                }
              );
            }
          );
        }
      );
    }
  );
});
module.exports = router;
