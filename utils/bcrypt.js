const bcrypt = require("bcrypt");

const passwordEncode = (password, cb) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    cb(err, hashedPassword);
  });
};

const passwordDecode = (password, matched, cb) => {
  bcrypt.compare(password, matched, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = {
  passwordEncode,
  passwordDecode,
};
