const mysql = require("mysql2");
const ENUS = require("./language/en/en_US");
const ZHCN = require("./language/zh/zh_CN");
const ZHHK = require("./language/zh/zh_HK");
const ZHTW = require("./language/zh/zh_TW");
const JAJP = require("./language/ja/ja_JP");

const logRequestDetails = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.info(`[${currentTime}] ${req.method} ${req.url} ${res.statusCode}`);
  next();
};

const sqlSupport = (req, _, next) => {
  const pool = mysql.createPool({
    host: process.env.SQL_CONNECT_HOST,
    user: process.env.SQL_CONNECT_USER,
    port: process.env.SQL_CONNECT_PORT,
    password: process.env.SQL_CONNECT_PASS,
    database: process.env.SQL_CONNECT_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  req.$db = pool.promise();
  next();
};

const languageResponse = (req, _, next) => {
  const { languageCode, languageRegionCode } = req.query;
  if (languageCode == "en") {
    req.message = ENUS;
  } else if (languageCode == "zh") {
    if (languageRegionCode == "CN") {
      req.message = ZHCN;
    } else if (languageRegionCode == "TW") {
      req.message = ZHTW;
    } else if (languageRegionCode == "HK") {
      req.message = ZHHK;
    } else {
      req.message = ZHCN;
    }
  } else if (languageCode == "ja") {
    req.message = JAJP;
  } else {
    req.message = ENUS;
  }
  next();
};

const sourceVerify = (req, _, next) => {
  if (req.url && req.url.split("/")[2] === "upload") {
  }
  next();
};

module.exports = {
  logRequestDetails,
  sqlSupport,
  languageResponse,
  sourceVerify,
};
