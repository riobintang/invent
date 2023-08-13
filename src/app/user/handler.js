const { userServices } = require("../../service/mysql/userService");

const {
  loginUserSchema,
  addUserSchema,
} = require("../../validation/userSchema");
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
          accessToken: user.token,
          user: user.userRole,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  handlerAddUser: async (req, res, next) => {
    try {
      const dataUser = validation(addUserSchema, req.body);
      const addedUser = await userServices.addUser(
        dataUser.username,
        dataUser.id_department
      );

      res.status(200).json({
        status: "success",
        message: "successfully add User",
        data: {
          username: addedUser.username,
          password: addedUser.password,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetAllUser: async (req, res, next) => {
    try {
      const user = await userServices.getAllUser();
      res.status(200).json({
        status: 'success',
        message: 'successfully get all User',
        data: user,
      })
    } catch (error) {
      next(error);
    }
  },
  handlerResetPassword: async (req, res, next) => {
    try {
      const uuid = req.params;
      const user = await userServices.resetPasswordUser(uuid);
      res.status(201).json({
        status: 'success',
        message: 'successfully reset password User',
        data: {
          password: user,
        }
      });
    } catch (error) {
      next(error);
    }
  },
};
