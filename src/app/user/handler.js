const userServices = require("../../service/mysql/userService");

const {
  loginUserSchema,
  addUserSchema,
  changePasswordUserSchema,
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
          workUnit: user.userWorkUnit,
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
        dataUser.id_work_unit
      );

      res.status(201).json({
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
  handlerGetAllUserWithoutAdmin: async (req, res, next) => {
    try {
      const user = await userServices.getAllUserWithoutAdmin();
      res.status(200).json({
        status: "success",
        message: "successfully get all User",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerResetPassword: async (req, res, next) => {
    try {
      const { uuid } = req.params;
      const user = await userServices.resetPasswordUser(uuid);
      res.status(200).json({
        status: "success",
        message: "successfully reset password User",
        data: {
          password: user,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  handlerChangePassword: async (req, res, next) => {
    try {
      const userUUID = req.user.uuid;
      const requestData = validation(changePasswordUserSchema, req.body);
      await userServices.changePassword(
        (id = userUUID),
        requestData.oldPassword,
        requestData.newPassword,
        requestData.confirmPassword
      );
      res.status(200).json({
        status: "success",
        message: "successfully change password User",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetAllUserWithoutAdmin: async (req, res, next) => {
    try {
      const users = await userServices.getAllUserWithoutAdmin();
      res.status(200).json({
        status: "success",
        message: "successfully get all Users",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
};
