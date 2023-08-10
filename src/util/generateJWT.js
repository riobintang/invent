const jwt = require("jsonwebtoken");

function generateJWT(uuid, value) {
  return (token = jwt.sign(
    { expiresIn: "30m", uuid: uuid, value: value },
    process.env.private
  ));
}

module.exports = generateJWT;
