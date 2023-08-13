const { Type } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

const getAllTypes = async () => {
  return await Type.findAll();
};

const getTypeById = async (id) => {
  const type = await Type.findByPk(id);
  if (!type) {
    throw new ResponseError(400, "Code Item not found");
  }
  return type;
};

const addType = async (code, name) => {
  const checkType = await Type.count({
    where: {
      code: code,
    },
  });

  if (checkType > 0) {
    throw new ResponseError(401, "Code has been used");
  }

  return await Type.create({
    code: code,
    name: name,
  });
};

const updateType = async (id, code, name) => {
  const type = await Type.findByPk(id);
  if (!type) {
    throw new ResponseError(400, "Type item is not found");
  }

  return await type.update({
    code: code,
    name: name,
  });
};

const checkType = async (id) => {
  const checkType = await Type.count({
    where: {
      id: id,
    },
  });

  if (checkType == 0) {
    throw new ResponseError(400, "Type is not found");
  }
  return checkType;
};

module.exports = {
  getAllTypes,
  getTypeById,
  addType,
  updateType,
  checkType,
};
