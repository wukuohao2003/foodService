const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  console.log(req.message);
  req.$db.execute("select * from user").then(([rows]) => {
    res.json(rows);
  });
});

router.get("/verify", (req, res) => {
  req.sms((error, result) => {
    res.json({
      result,
      error,
    });
  });
});
module.exports = router;
