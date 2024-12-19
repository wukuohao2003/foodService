const express = require("express");
const {
  getFoodList,
  addFood,
  getFoodOne,
  loadFood,
  editFood,
} = require("../../controllers/food");
const router = express.Router();

// 查询食谱
router.get("/food/list", getFoodList);

// 获取食谱详情;
router.get("/food/:id", getFoodOne);

// 添加食谱;
router.post("/food", addFood);

// 下载食谱;
// router.get("/food/download/:id", loadFood);

// 修改食谱;
// router.put("/food/:id", editFood);

module.exports = router;
