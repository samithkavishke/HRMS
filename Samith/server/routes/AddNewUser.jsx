const express = require("express");
const { pool, dbname } = require("../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
router.post("/", (req, res) => {
  //   let password_hash = "";
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      // Store hash in the database
      console.log(hash);
      pool.query(
        `INSERT INTO ${dbname}.user_info (username, employee_id, passcode_hash, user_type, branch_code) VALUES (?,?,?,?,?);`,
        [
          req.body.username,
          req.body.employee_id,
          hash,
          req.body.user_type,
          req.body.branch_code,
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
  });

  //   console.log(req.body.employerID);
  //   console.log(req.body);
});

module.exports = router;
