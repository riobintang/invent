const { Department } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

module.exports = {
  getAll: async () => {
    return await Department.findAll();
  },
  getById: async (id) => {
    const department = await Department.findByPk(id);
    if (!department) {
      throw new ResponseError(400, "Department not found");
    }

    return department;
  },
};
