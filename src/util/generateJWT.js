const jwt = require("jsonwebtoken");

function generateJWT(uuid, value) {
  return jwt.sign(
    {
      uuid: uuid,
      value: value,
    },
    process.env.private,
    {
      expiresIn: "30m",
    }
  );
}

module.exports = generateJWT;
