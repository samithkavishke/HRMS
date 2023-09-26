const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const bcrypt = require("bcrypt");
const cors = require("cors");

router.post("/", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      console.log("changing password:", hash);
      pool.query(
        `UPDATE ${dbname}.user_info SET  passcode_hash = ? WHERE employee_id = ?;`,
        [hash, req.body.employee_id],
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
});

//   console.log(req.body.employerID);
//   console.log(req.body);

module.exports = router;
