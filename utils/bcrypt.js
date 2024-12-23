const bcrypt = require("bcrypt");

const secretEncode = (secret, cb) => {
  bcrypt.hash(secret, 10, (err, hashedSecret) => {
    cb(err, hashedSecret);
  });
};

const secretDecode = (secret, matched, cb) => {
  bcrypt.compare(secret, matched, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = {
  secretEncode,
  secretDecode,
};
