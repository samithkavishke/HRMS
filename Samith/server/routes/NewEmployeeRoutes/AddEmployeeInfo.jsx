const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  console.log(req.body);
  console.log("nice");
  const workerData = req.body.workerData;
  const personalData = req.body.personalData;
  const emergencyData = req.body.emergencyData;
  const dependantData = req.body.dependantData;

  const BirthDate = new Date(personalData.birthdate);

  const birth_date = BirthDate.getDate();
  const birth_month = BirthDate.getMonth();
  const birth_year = BirthDate.getFullYear();
  console.log(
    "BirthDate:",
    BirthDate,
    "|birth_date:",
    birth_date,
    "|birth_month:",
    birth_month,
    "|birth_year:",
    birth_year
  );
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
          workerData.employee_id,
          personalData.first_name,
          personalData.last_name,
          personalData.address_line_1,
          personalData.address_line_2,
          personalData.town,
          birth_year,
          monthNames[birth_month],
          birth_date,
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
              workerData.employee_id,
              emergencyData.ec_emp_contact,
              emergencyData.ec_first_name,
              emergencyData.ec_last_name,
              emergencyData.ec_phone_number,
              emergencyData.ec_relation,
            ],

            (err, row, field) => {
              if (err) {
                return console.log(err);
              }
              pool.query(
                `INSERT INTO ${dbname}.dependent (dependent_id, employee_id, first_name, last_name) VALUES (?,?,?,?);`,
                [
                  dependantData.dependant_id,
                  workerData.employee_id,
                  dependantData.dependant_first_name,
                  dependantData.dependant_last_name,
                ],
                (err, row, field) => {
                  if (err) {
                    return console.log(err);
                  }
                  pool.query(
                    `INSERT INTO ${dbname}.subordinates (subordinate_id, supervisor_id) VALUES (?,?);`,
                    [workerData.employee_id, workerData.supervisor],
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
    }
  );
});
module.exports = router;
