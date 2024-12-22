const { scheduleJob } = require("node-schedule");
const { sendSMS } = require("../../utils/opensms");

const getCountryList = (req, res) => {
  req.sql({ sql: "SELECT * FROM country" }, (error, result) => {
    if (error) {
      res.status(500).json({
        code: error.errno,
        msg: error.sqlMessage,
        data: {},
      });
    } else {
      res.json({
        code: 200,
        msg: "Success",
        data: result,
      });
    }
  });
};

const sendSmsCode = async (req, res) => {
  const { country, phone } = req.query;
  const getCode = () => {
    let defaultStr = "1234567890";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += defaultStr[Math.floor(Math.random() * defaultStr.length)];
    }
    return code;
  };
  const code = getCode();
  const phoneNumber = `${country}${phone}`;
  const response = await sendSMS(phoneNumber, code);
  const createTime = new Date().getTime();
  if (response.body.Code == "OK") {
    global[response.body.RequestId] = {
      verifyCode: code,
      createTime,
    };
    scheduleJob(createTime + 3 * 60 * 1000, () => {
      if (global[response.body.RequestId]) {
        delete global[response.body.RequestId];
      }
    });
    console.log(response.body.RequestId);
    
    res.json({
      code: 200,
      msg: "Success!",
      data: {
        serial: response.body.RequestId,
      },
    });
  } else {
    res.json({
      code: 500,
      msg: response.body.Message,
      data: {
        serial: "",
      },
    });
  }
};

const verifyCode = (req, res) => {
  const { code, serial } = req.body;
  const verifyTime = new Date().getTime();
  console.log(serial);

  if (global[serial]) {
    console.log(1);
    
    let createTime = global[serial].createTime;
    if (verifyTime - createTime < 3 * 60 * 1000) {
      console.log(global[serial],code);
      
      if (global[serial].verifyCode == code) {
        delete global[serial];
        res.json({
          code: 200,
          msg: "Verify Success!",
          data: {},
        });
      } else {
        res.json({
          code: 400,
          msg: "The verification code is incorrect. Please enter it again.",
          data: {},
        });
      }
    } else {
      res.json({
        code: 410,
        msg: "The verification code has expired. Please obtain it again.",
        data: {},
      });
    }
  } else {
    res.json({
      code: 404,
      msg: "Please try to obtain the verification code again.",
      data: {},
    });
  }
};

module.exports = {
  getCountryList,
  sendSmsCode,
  verifyCode,
};
