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
  const dataQty = await sequelize.query("SELECT ni.id, ni.code, ni.name, ni.quantity, COUNT(inventories.id_name_item) AS assigned, (ni.quantity - COUNT(inventories.id_name_item)) AS total FROM `name_items` ni LEFT JOIN `inventories` ON ni.id = inventories.id_name_item GROUP BY ni.id, ni.code, ni.name, ni.quantity HAVING ni.id = :id_name_item;", {
    replacements: { id_name_item: id_name_item },
    type: sequelize.QueryTypes.SELECT
  });
  console.log(dataQty)
  if (!dataQty) {
    throw new ResponseError(400, "Item not found");
  }
  const nameItem = await nameItemService.getNameItemById(id_name_item);
  const countInvent = await Inventory.findOne({
    where: {
      id_name_item,
      id_work_unit
    },
    order: [["createdAt", "DESC"]],
  });

  const qtyLatest = parseInt(countInvent?.codeInvent || 0);
  // const qtyInventoryLeft = nameItem.quantity - qtyLatest;
  // console.log(dataQty)
  console.log(`quantity = ${{quantity}}`)
  console.log(dataQty.total);
  console.log(quantity > dataQty.total)
  if (quantity > dataQty[0].total) {
    throw new ResponseError(400, `Max quantity is ${dataQty[0].total}`);
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
        }
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

const getAll = async (id_name_item = null, id_work_unit = null) => {
  const items = await Inventory.findAll({
    where: {
      id_name_item,
      id_work_unit,
    },
  });

  return items;
};

const getAllItemUnsigned = async () => {
  const data = await sequelize.query(
    "SELECT ni.id, ni.code, ni.name, ni.quantity, COUNT(inventories.id_name_item) AS assigned, (ni.quantity - COUNT(inventories.id_name_item)) AS total FROM `name_items` ni LEFT JOIN `inventories` ON ni.id = inventories.id_name_item GROUP BY ni.id, ni.code, ni.name, ni.quantity HAVING (ni.quantity - COUNT(inventories.id_name_item)) > 0;",
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
