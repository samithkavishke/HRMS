const express = require("express");
const pool = require("../lib/pool.jsx");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// router.post("/", (req, res) => {
//   console.log(req.body);
//   const userName = req.body.username;
//   const password = req.body.password;
//   console.log(userName + " " + password);
// });

router.post("/", (req, res) => {
  pool.query(
    `SELECT username,passcode_hash,employee_id,user_type FROM sql6587376.user_info WHERE username = "${req.body.username}";`,
    (err, row, field) => {
      if (err) {
        return console.log(err);
      }
      let result = JSON.parse(JSON.stringify(row));
      let out = result[0];
      let token = "";
      if (result.length > 0) {
        console.log(out.passcode_hash, req.body.password);
        bcrypt.compare(req.body.password, out.passcode_hash).then((result) => {
          if (result) {
            token = jwt.sign({ username: out.username }, "AAAA", {
              expiresIn: "90d",
            });
          }
          return res.send({ success: result, token });
        });
      } else {
        res.send({ success: false, token });
      }
    }
  );
});

module.exports = router;
