const { scheduleJob } = require("node-schedule");
const { sendSMS } = require("../../utils/opensms");
const { options } = require("../../routes/user");

const getCountryList = (req, res) => {
  req.sql({ sql: "SELECT * FROM country" }, (error, result) => {
    if (error) {
      res.json({
        code: 500,
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

  if (global[serial]) {
    let createTime = global[serial].createTime;
    if (verifyTime - createTime < 3 * 60 * 1000) {
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

const createAndSign = (req, res) => {
  const { phoneNumber } = req.body
  req.sql({
    sql:"SELECT id,status FROM user WHERE account=?",
    options:[phoneNumber],
  },(error,result) => {
    if (error) {
      res.status(500).json({
        code: error.errno,
        msg: error.sqlMessage,
        data: {},
      });
    } else {
      if(result.length > 0 ) {
        if(result[0].status == "normal") {
          res.json({
            code:200,
            msg:"The user status is normal.",
            data:{}
          })
        }
        else {
          res.json({
            code:403,
            msg:"The user has been deactivated. Please wait for fifteen days or cancel the deactivation status.",
            data:{}
          })
        }
      }
      else {
        req.sql({
          sql:"INSERT INTO user(account) VALUES(?)",
          options:[phoneNumber],
          type:"Object"
        },(error,result) => {
          if (error) {
            res.json({
              code: 500,
              msg: error.sqlMessage,
              data: {},
            });
          }else {
            res.json({
              code:403,
              msg:"Registration succeeded.",
              data:{}
            })
          }
        })
      }
    }
  })
}

module.exports = {
  getCountryList,
  sendSmsCode,
  verifyCode,
  createAndSign
};
