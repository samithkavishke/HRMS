const express = require("express");
const { pool, dbname } = require("../../lib/pool.jsx");
const router = express.Router();
const cors = require("cors");

router.post("/", (req, res) => {
  console.log(req.body.leave_id);
  pool.query(
    `UPDATE ${dbname}.leave_application SET  approval_status = 1 WHERE leave_id = ?;`,
    [req.body.leave_id],
    (err, row, field) => {
      if (err) {
        return console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
});

//   console.log(req.body.employerID);
//   console.log(req.body);

module.exports = router;
