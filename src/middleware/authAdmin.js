const ResponseError = require("../util/responseError");

function authAdmin(req, res, next) {
  const checkUser = req.user;

  if (checkUser.value !== 1) {
    throw new ResponseError(403, "You don't have permission to access");
  }
  req.user.admin = 1;
  return next();
}

module.exports = authAdmin;
