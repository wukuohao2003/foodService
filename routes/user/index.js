const express = require("express");
const {
  sendSmsCode,
  getCountryList,
  verifyCode,
} = require("../../controllers/user");
const router = express.Router();

// 获取国家信息
router.get("/country/list", getCountryList);

// 获取验证码
router.get("/verify", sendSmsCode);

// 验证码校验
router.post("/verify", verifyCode);

module.exports = router;
