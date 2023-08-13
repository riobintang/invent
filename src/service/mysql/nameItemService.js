const { NameItem, Type } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const { checkType } = require("./typeService");

const getAllNameItem = async () => {
  return await NameItem.findAll();
};

const getNameItemById = async (id) => {
  const nameItem = await NameItem.findByPk(id);
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
  });

  return nameItem;
};

const addNameItem = async (code, name, id_type) => {
  await checkType(id_type);

  if (checkType == 0) {
    throw new ResponseError(400, "Type is not found");
  }

  const checkNameItem = await NameItem.count({
    where: {
      code: code,
    },
  });

  if (checkNameItem > 0) {
    throw new ResponseError(400, "Code has been used");
  }

  return await NameItem.create({
    code: code,
    name: name,
    id_type: id_type,
  });
};

const updateNameType = async (id, code, name, id_type) => {
  const type = await Type.findByPk(id);

  if (!type) {
    throw new Response(400, "Type is not found");
  }

  await checkType(id_type);

  return await type.update({
    code,
    name,
    id_type,
  });
};

module.exports = {
  getAllNameItem: getAllNameItem,
  getNameItemById: getNameItemById,
  getNameItemByType: getNameItemByType,
  addNameItem: addNameItem,
  updateNameType,
};
