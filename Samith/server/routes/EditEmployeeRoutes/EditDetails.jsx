const express = require("express");
const pool = require("../../lib/pool.jsx");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.post("/", (req, res) => {
  const workData = req.body.workData;
  const personalData = req.body.personalData;
  const emergencyData = req.body.emergencyData;
  console.log(workData);
  console.log(personalData);
  console.log(emergencyData);

  pool.query(
    `Update sql6587376.employee_work SET ` +
      `job_title = "${workData["job_title"]}", ` +
      `pay_grade = "${workData["pay_grade"]}", ` +
      `employee_status = "${workData["employee_status"]}", ` +
      `contract_period = "${workData["contract_period"]}", ` +
      `department = "${workData["department"]}" ` +
      `WHERE employee_id = "${workData["employee_id"]}"; `,
    (err, row, field) => {
      if (err) {
        return console.log(err);
      }
      pool.query(
        `Update sql6587376.employee_personal SET ` +
          `first_name = "${personalData["first_name"]}", ` +
          `last_name = "${personalData["last_name"]}", ` +
          `address_line1 = "${personalData["address_line1"]}", ` +
          `address_line2 = "${personalData["address_line2"]}", ` +
          `town = "${personalData["town"]}", ` +
          `birth_year = "${personalData["birth_year"]}", ` +
          `birth_month = "${personalData["birth_month"]}", ` +
          `birth_date = "${personalData["birth_date"]}", ` +
          `marital_status = "${personalData["marital_status"]}", ` +
          `gender = "${personalData["gender"]}" ` +
          `WHERE employee_id = "${personalData["employee_id"]}";`,
        (err, row, field) => {
          if (err) {
            return console.log(err);
          }
          pool.query(
            `Update sql6587376.emergency_info SET ` +
              `employee_contact = "${emergencyData["employee_contact"]}", ` +
              `contact_first_name = "${emergencyData["contact_first_name"]}", ` +
              `contact_last_name = "${emergencyData["contact_last_name"]}", ` +
              `contact_relation = "${emergencyData["contact_relation"]}", ` +
              `contact_phone_number = "${emergencyData["contact_phone_number"]}" ` +
              `WHERE employee_id = "${emergencyData["employee_id"]}";`,
            (err, row, field) => {
              if (err) {
                return console.log(err);
              }
              return res.send({ success: true });
            }
          );
        }
      );
    }
  );
});
module.exports = router;
