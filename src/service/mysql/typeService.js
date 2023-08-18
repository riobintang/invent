const { Op } = require("sequelize");
const { Type } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

const getAllTypes = async () => {
  return await Type.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

const getTypeById = async (id) => {
  const type = await Type.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!type) {
    throw new ResponseError(400, "Code Item not found");
  }
  return type;
};

const addType = async (code, name, description = "") => {
  await checkCodeIsExist(code);

  return await Type.create({
    code: code,
    name: name,
    description: description,
  });
};

const updateType = async (id, code, name, description = "") => {
  const type = await Type.findByPk(id);
  if (!type) {
    throw new ResponseError(400, "Type item is not found");
  }

  await checkCodeIsExist(code, id);

  return await type.update({
    code: code,
    name: name,
    description: description,
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

// This function for checking "Code" is exist or not.
// Return error if "Code" has more than count parameter.
// Count parameter check how many "Code" are same in database
// Count = 1 is for add, Count = 2 is for update
const checkCodeIsExist = async (code, id = null) => {
  const checkCode = await Type.count({
    where: {
      code: code,
      id: {
        [Op.ne]: id,
      },
    },
  });

  if (checkCode > 0) {
    throw new ResponseError(400, "Code has been used");
  }
  return;
};

module.exports = {
  getAllTypes,
  getTypeById,
  addType,
  updateType,
  checkType,
};
