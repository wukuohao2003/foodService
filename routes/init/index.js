const express = require("express");
const { appInit } = require("../../controllers/init");
const router = express.Router();

// 应用初始化
router.get("/app/init", appInit);

module.exports = router;