const { Op } = require("sequelize");
const randomstring = require("randomstring");

const { User, Role, Work_unit } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const bcrypt = require("bcrypt");
const generateJWT = require("../../util/generateJWT");
const generatePassword = require("../../util/generatePassword");

module.exports = {
  getUserByUUID: async (uuid) => {
    const user = await User.findOne({
      where: {
        uuid,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        { model: Work_unit, attributes: ["name", "id"] },
        { model: Role, attributes: ["name", "id", "value"] },
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
      include: [{ model: Role }, { model: Work_unit }],
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

    return {
      token: token,
      userRole: user.Role.value == "1" ? "admin sarana prasarana" : "admin jurusan",
      userWorkUnit: user.Work_unit.name,
    };
  },
  resetPasswordUser: async (uuid) => {
    const findUser = await User.findOne({
      where: {
        uuid,
      },
    });

    if (!findUser) {
      throw new ResponseError(400, "User not found");
    }

    const password = await generatePassword();
    await findUser.update({
      password: password.hashPassword,
    });

    return password.password;
  },
  addUser: async (username, id_work_unit) => {
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
      id_work_unit: id_work_unit,
      password: password.hashPassword,
    });

    return {
      username: username,
      password: password.password,
    };
  },
  getAllUserWithoutAdmin: async () => {
    const users = await User.findAll({
      where: {
        id_role: {
          [Op.ne]: 1,
        },
      },
      attributes: { exclude: ["id_work_unit", "id_role", "password", "id", "createdAt", "updatedAt"] },
      include: [{model: Work_unit, attributes: ["name"]}]
    });

    return users.map((user) => {
      return {
        uuid: user.uuid,
        username: user.username,
        work_unit: user.Work_unit.name
      }
    });
  },
  changePassword: async (uuid, oldPassword, newPassword, confirmPassword) => {
    const user = await User.findOne({
      where: { uuid },
    });
    if (!user) {
      throw new ResponseError(400, "User not found");
    }

    const passwordValidate = await bcrypt.compare(oldPassword, user.password);
    if (!passwordValidate) {
      throw new ResponseError(400, "Wrong Old Password");
    }

    if (newPassword !== confirmPassword) {
      throw new ResponseError(
        400,
        "Password and Confirm password are not same"
      );
    }

    return await user.update({
      password: await bcrypt.hash(newPassword, 10),
    });
  },
};
