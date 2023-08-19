const { Op } = require("sequelize");
const { NameItem, Type } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const { checkType } = require("./typeService");

const getAllNameItem = async () => {
  return await NameItem.findAll();
};

const getNameItemById = async (id) => {
  const nameItem = await NameItem.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!nameItem) {
    throw new ResponseError(400, "Name Type Item not found");
  }
  return nameItem;
};

const getNameItemByType = async (id_type) => {
  const nameItem = await NameItem.findAll({
    include: [
      {
        model: Type,
        where: {
          id: id_type,
        },
        attributes: [],
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt", "id_type"],
    },
  });

  return nameItem;
};

const addNameItem = async (code, name, id_type) => {
  await checkType(id_type);

  if (checkType == 0) {
    throw new ResponseError(400, "Type is not found");
  }

  await checkCodeNameItem(code)

  return await NameItem.create({
    code: code,
    name: name,
    id_type: id_type,
  });
};

const updateNameItem = async (id, code, name, id_type) => {
  const nameItem = await NameItem.findByPk(id);

  if (!nameItem) {
    throw new ResponseError(400, "Name Item is not found");
  }
  await checkCodeNameItem(code, id);
  await checkType(id_type);

  return await nameItem.update({
    code,
    name,
    id_type,
  });
};

const checkCodeNameItem = async (code, id = null) => {
  const checkCode = await NameItem.count({
    where: {
      code,
      id: { 
        [Op.ne]: id 
      },
    },
  });

  if (checkCode > 0) {
    throw new ResponseError(400, "Code has been used");
  }

  return;
};

module.exports = {
  getAllNameItem: getAllNameItem,
  getNameItemById: getNameItemById,
  getNameItemByType: getNameItemByType,
  addNameItem: addNameItem,
  updateNameItem,
};
