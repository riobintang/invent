const { Op } = require("sequelize");
const {
  Inventory,
  Work_unit,
  Added_item,
} = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const addedItemServices = require("./addedItemServices");
const { addItemCondition } = require("./inventCondition");
const workUnitService = require("./workUnitService");

const foundInventory = async (
  id = null,
  codeInvent = null,
  option = { op: "count" || "found", qty },
  err = "Code has been used"
) => {
  const item = await Inventory.count({
    where: {
      [Op.or]: [
        {
          id: id,
        },
        {
          codeInvent: codeInvent,
        },
      ],
    },
  });

  if (option.op === "count") {
    if (item > option.count) throw new ResponseError(400, err);
  } else if (option.op === "found") {
    if (item !== option.count) {
      throw new ResponseError(400, err);
    }
  }

  return;
};

const add = async (quantity, id_added_item, id_work_unit) => {
  const addedItem = await addedItemServices.getItem(id_added_item);
  const countInvent = await Inventory.findOne({
    where: {
      id_added_item,
    },
    order: ["createdAt", "DESC"],
  });
  console.log(countInvent);
  const qtyLatest = parseInt(countInvent?.codeInvent || 0);
  const qtyInventoryLeft = addedItem.quantity - qtyLatest;
  if (quantity > qtyInventoryLeft) {
    throw new ResponseError(400, `Max quantity is ${qtyInventoryLeft}`);
  }
  //const newCodeInvent = (qtyLatest + 1).toString().padStart(3, "0");

  for (var x = qtyLatest + 1; x <= quantity + qtyLatest; x++) {
    const insertInvent = await Inventory.create({
      codeInvent: x.toString().padStart(3, "0"),
      id_added_item,
      id_work_unit,
    });
    await addItemCondition(insertInvent.id, 1, 1);
  }

  return;
};

const getAll = async (id_added_item = null, id_work_unit = null) => {
  const items = await Inventory.findAll({
    where: {
      id_added_item,
      id_work_unit,
    },
  });

  return items;
};

module.exports = {
  getAllInventoryAddedWorkUnit: getAll,
  addInventory: add,
  foundInventory,
};
