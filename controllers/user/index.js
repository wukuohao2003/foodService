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

const sendSmsCode = (req, res) => {
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
  res.json({
    code: 200,
    msg: "Success!",
    data: {},
  });
};

module.exports = {
  getCountryList,
  sendSmsCode,
};
