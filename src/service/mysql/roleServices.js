const { Role } = require("../../../sequelize/models");

module.exports = {
    roleServices: {
        getRoles: async () => {
            const roles = await Role.findAll();
            return roles;
        },
        getRoleById: async (id) => {
            const role = await Role.findByPk(id);
            if (!role) {
                throw new Error(400, "Role not found");
            }
            return role;
        }
    }
}