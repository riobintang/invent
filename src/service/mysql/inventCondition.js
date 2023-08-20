const {
  InventCondition,
  Inventory,
  ConditionItem,
} = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const { foundInventory } = require("./inventoryService");

const addItemCondition = async (id_inventory, id_condition, quantity = 1) => {
  await foundInventory((id = id_inventory), { op: "found", qty: 1 });


  const item = await InventCondition.count({
    where: {
      id_inventory,
    },
  });

  if (item > 0) {
    throw new ResponseError(400, "Item already exist");
  }

  return await InventCondition.create({
    id_inventory,
    id_condition,
    quantity,
  });
};

const getAll = async (code = null) => {
  return await Inventory.findAll({
    where: {
        code: code,
    },
    include: [
      {
        model: ConditionItem,
        through: {
          attributes: [],
        },
      },
    ],
  });
};

module.exports = {
    addItemCondition,
    getAll,
};
