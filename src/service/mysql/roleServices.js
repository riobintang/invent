const { Role } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

module.exports = {
  getRoles: async () => {
    const roles = await Role.findAll();
    return roles;
  },
  getRoleById: async (id) => {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new ResponseError(400, "Role not found");
    }
    return role;
  },
};
