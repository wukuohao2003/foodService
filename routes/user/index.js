const express = require("express");
const { sendSmsCode, getCountryList } = require("../../controllers/user");
const router = express.Router();

// 获取国家信息
router.get("/country", getCountryList);

// 获取验证码
router.get("/verify", sendSmsCode);

module.exports = router;
