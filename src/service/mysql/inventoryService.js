const { Op } = require("sequelize");
const {
  Inventory,
  Work_unit,
  Added_item,
  sequelize,
} = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const { addItemCondition } = require("./inventCondition");
const nameItemService = require("./nameItemService");

const foundInventory = async (
  id = null,
  codeInvent = null,
  option = { op: "count" || "found", qty },
  errorString = "Code has been used"
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
    if (item > option.count) throw new ResponseError(400, errorString);
  } else if (option.op === "found") {
    if (item !== option.count) {
      throw new ResponseError(400, errorString);
    }
  }

  return;
};

const add = async (quantity, id_name_item, id_work_unit) => {
  // const t = await sequelize.transaction();

  const nameItem = await nameItemService.getNameItemById(id_name_item);
  const countInvent = await Inventory.findOne({
    where: {
      id_name_item,
    },
    order: [["createdAt", "DESC"]],
  });

  const qtyLatest = parseInt(countInvent?.codeInvent || 0);
  const qtyInventoryLeft = nameItem.quantity - qtyLatest;
  if (quantity > qtyInventoryLeft) {
    throw new ResponseError(400, `Max quantity is ${qtyInventoryLeft}`);
  }
  //const newCodeInvent = (qtyLatest + 1).toString().padStart(3, "0");
  console.log(quantity);
  console.log(qtyLatest);
  console.log(quantity + qtyLatest);
  try {
    for (var x = qtyLatest + 1; x <= quantity + qtyLatest; x++) {
      const insertInvent = await Inventory.create(
        {
          codeInvent: x.toString().padStart(3, "0"),
          id_name_item,
          id_work_unit,
        },
        // {
        //   transaction: t,
        // }
      );
      await addItemCondition(insertInvent.id, 1, 1);
      
    }
    // return t.commit();
    return;
  } catch (error) {
    // await t.rollback;
  }
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

const getAllItemUnsigned = async () => {
  const data = await sequelize.query(
    "SELECT name_items.id, name_items.code, name_items.name, name_items.quantity, COUNT(inventories.id_name_item) AS assigned FROM `inventories` INNER JOIN name_items ON inventories.id_name_item = name_items.id GROUP BY inventories.id_name_item",
    { type: sequelize.QueryTypes.SELECT }
  );

  const newResult = data.map((item) => {
    return {
      id_name_item: item.id,
      code: item.code,
      name: item.name,
      qty: item.quantity - item.assigned,
    };
  });

  return newResult;
};

module.exports = {
  getAllInventoryAddedWorkUnit: getAll,
  addInventory: add,
  foundInventory,
  getAllItemUnsigned,
};
