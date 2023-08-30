const userService = require("../service/mysql/userService");
const ResponseError = require("../util/responseError");

async function authAdmin(req, res, next) {
  const checkUser = req.user;
  try {
    const user = await userService.getUserByUUID(checkUser.uuid);
    if (user.Role.value !== 1) {
      throw new ResponseError(403, "You don't have permission to access");
    }
    req.user.admin = 1;
    return next();
  } catch (error) {
    next(error);
  }
}

module.exports = authAdmin;
