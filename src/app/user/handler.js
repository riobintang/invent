const { userServices } = require("../../service/mysql/userService");
const { ResponseError } = require("../../util/responseError");
const { loginUserSchema } = require("../../validation/userSchema");
const { validation } = require("../../validation/validate");

module.exports = {
  handlerLogin: async (req, res, next) => {
    try {
      const dataUser = validation(loginUserSchema, req.body);
      const user = await userServices.login(dataUser);
      res.status(200).json({
        status: "success",
        message: "successfully Login",
        data: {
          accessToken: user,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  addUser: async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
  },
};
