const crypto = require("crypto");

const validatePassword = (password, hash, salt) => {
  let hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  console.log("hash to verify: ", hashVerify);
  console.log("hash: ", hash);

  return hashVerify === hash;
};

const generatePassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return { hash, salt };
};

module.exports = {
  validatePassword,
  generatePassword,
};
