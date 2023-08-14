const { Work_unit } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

module.exports = {
  addWorkUnit: async (code, name, description = "") => {
    const checkWorkUnit = await Work_unit.count({
      where: {
        code: code,
      },
    });
    if (checkWorkUnit > 0) {
      throw new ResponseError(400, "Code has been used");
    }

    

    return await Work_unit.create({
      code: code,
      name: name,
      description: description,
    });
  },
  updateWorkUnit: async (id, code, name, description) => {
    // const workUnit = this.getWorkUnitById(id);
    const getWorkUnit = await Work_unit.findByPk(id);
    if (!getWorkUnit) {
      throw new ResponseError(400, "Work Unit not found");
    }

    await getWorkUnit.update({
      code: code,
      name: name,
      description: description,
    });

    return getWorkUnit;
  },
  getAllWorkUnit: async () => {
    return await Work_unit.findAll();
  },
  getWorkUnitById: async (id) => {
    const workUnit = await Work_unit.findByPk(id);
    if (!workUnit) {
      throw new ResponseError(400, "Work Unit not found");
    }
    return workUnit;
  },
};
