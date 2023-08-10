const bcrypt = require('bcrypt')
const randomstring = require('randomstring');
async function generatePassword() {


  const password = randomstring.generate({
    charset: "alphabetic",
    length: 10,
  });

  const hashPassword = await bcrypt.hash(password, 10);

  return {
    password, 
    hashPassword,
  }
}

module.exports = generatePassword;
