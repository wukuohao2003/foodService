const express = require("express");
const {
  sendSmsCode,
  getCountryList,
  verifyCode,
  createAndSign,
} = require("../../controllers/user");
const router = express.Router();

// 获取国家信息
router.get("/country/list", getCountryList);

// 获取验证码
router.get("/verify", sendSmsCode);

// 验证码校验
router.post("/verify", verifyCode);

// 用户登录/注册
router.post("/auth",createAndSign)

module.exports = router;
