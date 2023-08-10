const ResponseError = require("../util/responseError");

function checkAdmin(req, res, next) {
  const checkUser = req.user;

  if (checkUser.value !== 1) {
    throw new ResponseError(403, "You don't have permission to access");
  }

  return next();
}

module.exports = checkAdmin;
