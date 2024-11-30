const express = require("express");
const { getFoodList } = require("../../controllers/food");
const router = express.Router();

// 查询食谱
router.get("/food/list", getFoodList);

router.get("/", (req, res) => {
  res.json({
    data: {
      code: 200,
    },
  });
});

module.exports = router;
