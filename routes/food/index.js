const express = require("express");
const { getFoodList } = require("../../controllers/food");
const router = express.Router();

// 查询食谱
router.get("/food/list", getFoodList);

module.exports = router;
