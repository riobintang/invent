const { Op } = require("sequelize");
const randomstring = require("randomstring");

const { User, Role, Department } = require("../../../sequelize/models");
const ResponseError  = require("../../util/responseError");
const bcrypt = require("bcrypt");
const generateJWT = require("../../util/generateJWT");
const generatePassword = require("../../util/generatePassword");

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

      return {token, userRole: user.Role.value == "1" ? 'admin': 'user'};
    },
    resetPasswordUser: async (uuid) => {
      const findUser = await User.findOne({
        where: {
          uuid
        }
      });

      if (!findUser) {
        throw new ResponseError(400, "User not found");
      }

      const password = await generatePassword();
      await findUser.update({
        password: password.hashPassword
      });

      return {
        password: password.password,
      }
      
    },
    addUser: async (username, id_department) => {
      const findUser = await User.count({
        where: {
          username,
        },
      });

      if (findUser >= 1) {
        throw new ResponseError(400, "Username has been used");
      }

      const password = await generatePassword();
      
      await User.create({
        username: username,
        id_department: id_department,
        password: password.hashPassword,
      });

      return {
        username: username,
        password: password.password,
      };
    },
    getAllUser: async () => {
      const user = await User.findAll({
        where: {
          id_role: {
            [Op.ne]: 1,
          }
        },
        attributes: {exclude: ['password', 'id']}
      });

      return user;
    }
  },
};
