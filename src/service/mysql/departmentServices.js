const { Department } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

module.exports = {
  getAll: async () => {
    return await Department.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  },
  getById: async (id) => {
    const department = await Department.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!department) {
      throw new ResponseError(400, "Department not found");
    }

    return department;
  },
  addDepartment: async (name) => {
    const department = await Department.count({
      where: {
        name,
      },
    });
    if (department > 0) {
      throw new ResponseError(400, "Department has been used");
    }
    return await Department.create({
      name,
    });
  },
  updateDepartment: async (id, name) => {
    const department = await Department.findByPk(id);
    if (!department) {
      throw new ResponseError(400, "Department not found");
    }
    return await department.update({
      name,
    });
  },
};
