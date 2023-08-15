const { Op } = require("sequelize");
const { Work_unit } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

// This will check Code for Work Unit
const checkCodeWorkUnit = async (code, id = null) => {
  const result = await Work_unit.count({
    where: {
      code,
      id: {
        [Op.ne]: id,
      },
    },
  });

  if (result > 0) {
    throw new ResponseError(400, "Code has been used");
  }

  return;
};

const addWorkUnit = async (code, name, description = "") => {
  await checkCodeWorkUnit(code, 1);

  return await Work_unit.create({
    code: code,
    name: name,
    description: description,
  });
};
const updateWorkUnit = async (id, code, name, description = "") => {
  const getWorkUnit = await Work_unit.findByPk(id);
  if (!getWorkUnit) {
    throw new ResponseError(400, "Work Unit not found");
  }

  await checkCodeWorkUnit(code, 1, id);

  return await getWorkUnit.update({
    code: code,
    name: name,
    description: description,
  });
};

const getAllWorkUnit = async () => {
  return await Work_unit.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

const getWorkUnitById = async (id) => {
  const workUnit = await Work_unit.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!workUnit) {
    throw new ResponseError(400, "Work Unit not found");
  }
  return workUnit;
};

module.exports = {
  addWorkUnit: addWorkUnit,
  updateWorkUnit: updateWorkUnit,
  getAllWorkUnit: getAllWorkUnit,
  getWorkUnitById: getWorkUnitById,
};
