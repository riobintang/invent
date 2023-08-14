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
  await checkCodeIsExist(code, 1);
  
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

  await checkCodeIsExist(code, 2);

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

// This function for checking "Code" is exist or not. 
// Return error if "Code" has more than count parameter. 
// Count parameter check how many "Code" are same in database
// Count = 1 is for add, Count = 2 is for update
const checkCodeIsExist = async (code, count = 1) => {
  const checkCode = await Type.count({
    where: {
      code: code,
    },
  });

  if (checkCode > count - 1) {
    throw new ResponseError(401, "Code has been used");
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
