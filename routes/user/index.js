const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  console.log(req.message);
  req.$db.execute("select * from user").then(([rows]) => {
    res.json(rows);
  });
});

module.exports = router;
