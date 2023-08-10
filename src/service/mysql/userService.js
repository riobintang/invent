const { User, Role, Department } = require("../../../sequelize/models");
const { Op } = require("sequelize");
const { ResponseError } = require("../../util/responseError");
const bcrypt = require("bcrypt");
const generateJWT = require("../../util/generateJWT");
module.exports = {
  userServices: {
    getUserById: async (id) => {
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        include: [
          { model: Department, attributes: ["name", "id"] },
          { model: Role, attributes: ["name", "id"] },
        ],
      });
      if (!user) {
        throw new ResponseError(400, "User not found");
      }
      return user;
    },
    login: async (requestData) => {
      const user = await User.findOne({
        where: {
          username: requestData.username,
        },
        include: [{ model: Role }],
      });
      if (!user) {
        throw new ResponseError(401, "Username/Email or Password wrong");
      }

      const isPasswordValidate = await bcrypt.compare(
        requestData.password,
        user.password
      );
      if (!isPasswordValidate) {
        throw new ResponseError(401, "Username/Email or Password wrong");
      }

      const token = generateJWT((uuid = user.uuid), (value = user.Role.value));

      return token;
    },
  },
};
