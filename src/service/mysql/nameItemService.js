const { Op } = require("sequelize");
const { NameItem, Type } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const { checkType, getTypeById } = require("./typeService");

const getAllNameItem = async (excludeQTY = "") => {
  return await NameItem.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", excludeQTY],
    },
  });
};

const getNameItemById = async (id, excludeQTY = "") => {
  const nameItem = await NameItem.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt", excludeQTY],
    },
  });
  if (!nameItem) {
    throw new ResponseError(400, "Name Type Item not found");
  }
  return nameItem;
};

const getNameItemByType = async (id_type, excludeQTY="") => {
  const type = await getTypeById(id_type);

    const nameItems = await NameItem.findAll({
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
        exclude: ["createdAt", "updatedAt", "id_type", excludeQTY],
      },
    });
  return {
    nameItems,
    type: type.name,
  };
};

const addNameItem = async (code, name, id_type) => {
  await checkType(id_type);

  if (checkType == 0) {
    throw new ResponseError(400, "Type is not found");
  }

  await checkCodeNameItem(code, (id = null), id_type);

  return await NameItem.create({
    code: code,
    name: name,
    id_type: id_type,
  });
};

const updateNameItem = async (id, code, name) => {
  const nameItem = await NameItem.findByPk(id);

  if (!nameItem) {
    throw new ResponseError(400, "Name Item is not found");
  }

  console.log(nameItem);
  await checkCodeNameItem(code, id, (id_type = nameItem.id_type));

  return await nameItem.update({
    code,
    name,
  });
};

const updateQuantity = async (id, quantity) => {
  const nameItem = await NameItem.findByPk(id);
  if (!nameItem) {
    throw new ResponseError(400, "Name Item is not found");
  }
  console.log(nameItem)
  return await nameItem.update({
    quantity: quantity+nameItem.quantity,
  });
};

const checkCodeNameItem = async (code, id = null, id_type) => {
  const checkCode = await NameItem.count({
    where: {
      code,
      id_type,
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

const foundNameItem = async (id) => {
  const nameItem = await NameItem.count({
    where: {
      id: id,
    },
  });
  if (nameItem == 0) {
    throw new ResponseError(400, "Name Item not found");
  }

  return;
};

module.exports = {
  getAllNameItem: getAllNameItem,
  getNameItemById: getNameItemById,
  getNameItemByType: getNameItemByType,
  addNameItem: addNameItem,
  updateNameItem,
  foundNameItem,
  updateQuantity,
};
