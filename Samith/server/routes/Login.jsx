const express = require("express");
const { pool, dbname } = require("../lib/pool.jsx");
const router = express.Router();
const bcrypt = require("bcrypt");
const cors = require("cors");

router.post("/", (req, res) => {
  pool.query(
    `SELECT supervisor_id FROM ${dbname}.subordinates WHERE subordinate_id  in  (
SELECT employee_id FROM sql6588944.user_info WHERE username = ?);`,
    [req.body.username],
    (err, row1, field) => {
      if (err) {
        return console.log(err);
      }
      let stringResult = JSON.parse(JSON.stringify(row1));
      const supervisors = stringResult.map((item) => item.supervisor_id);
      pool.query(
        `SELECT username,passcode_hash,employee_id,user_type FROM ${dbname}.user_info WHERE username = "${req.body.username}";`,
        (err, row2, field) => {
          if (err) {
            return console.log(err);
          }
          let result2 = JSON.parse(JSON.stringify(row2));
          let out = result2[0];
          if (result2.length > 0) {
            bcrypt
              .compare(req.body.password, out.passcode_hash)
              .then((result) => {
                if (result) {
                  return res.send({ success: true, info: {username: out.username, emp_id: out.employee_id, user_type: out.user_type, supervisors}});
                }
                return res.send({ success: false});
              });
          } else {
            return res.send({ success: false});
          }
        }
      );
    }
  );
});
module.exports = router;
