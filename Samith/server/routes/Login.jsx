const express = require("express");
const pool = require("../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

// router.post("/", (req, res) => {
//   console.log(req.body);
//   const userName = req.body.username;
//   const password = req.body.password;
//   console.log(userName + " " + password);
// });

router.post("/", (req, res) => {
  pool.query(
    `SELECT username,passcode_hash FROM jupyter.user_info WHERE username = "${req.body.username}";`,
    (err, row, field) => {
      if (err) {
        return console.log(err);
      }
      let result = JSON.parse(JSON.stringify(row));
      if (result.length > 0) {
        console.log(result[0].passcode_hash, req.body.password);

        if (result[0].passcode_hash == req.body.password) {
          console.log("ado hri");
          res.send({ success: true });
        } else {
          res.send({ success: false });
        }
      } else {
        res.send({ success: false });
      }
    }
  );
});

module.exports = router;
