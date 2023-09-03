const { Op } = require("sequelize");
const {
  Inventory,
  Work_unit,
  Added_item,
  ConditionItem,
  NameItem,
  Room,
  sequelize,
} = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const { addItemCondition } = require("./inventCondition");
const nameItemService = require("./nameItemService");
const { checkRoom } = require("./roomService");
const roomService = require("./roomService");

const foundInventory = async ({
  id = null,
  codeInvent = null,
  option = { op: "count" || "found", qty },
}) => {
  if (option.op === "count") {
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
    if (item > option.qty) throw new ResponseError(400, "Code has been used");
  } else if (option.op === "found") {
    const item = await Inventory.findOne({
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
    if (!item) {
      throw new ResponseError(400, "Item not found");
    }
    return item;
  }

  return;
};

const add = async ({ quantity, id_name_item, id_work_unit }) => {
  // const t = await sequelize.transaction();
  const dataQty = await sequelize.query(
    "SELECT ni.id, ni.code, ni.name, ni.quantity, COUNT(inventories.id_name_item) AS assigned, (ni.quantity - COUNT(inventories.id_name_item)) AS total FROM `name_items` ni LEFT JOIN `inventories` ON ni.id = inventories.id_name_item GROUP BY ni.id, ni.code, ni.name, ni.quantity HAVING ni.id = :id_name_item;",
    {
      replacements: { id_name_item: id_name_item },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  if (!dataQty) {
    throw new ResponseError(400, "Item not found");
  }

  const countInvent = await Inventory.findOne({
    where: {
      id_name_item,
      id_work_unit,
    },
    order: [["codeInvent", "DESC"]],
  });

  const qtyLatest = parseInt(countInvent?.codeInvent || 0);

  if (quantity > dataQty[0].total) {
    throw new ResponseError(400, `Max quantity is ${dataQty[0].total}`);
  }
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
//get all with model nameitem, conditionitem, room.
const getAll = async ({
  name_item = null,
  id_work_unit = null,
  code_room = null,
}) => {
  const arrItems = [];
  const arrRoom = [];
  if (name_item) {
    const id_name_item = await nameItemService.getNameItemByName(name_item);
    arrItems.push({ id_name_item: id_name_item.id });
  }
  if (id_work_unit) {
    arrItems.push({ id_work_unit });
  }
  if (code_room) {
    arrRoom.push({ code: code_room });
  }
  const items = await Inventory.findAll({
    where: {
      [Op.and]: arrItems,
    },
    attributes: ["codeInvent"],
    include: [
      { model: NameItem, attributes: ["name"] },
      { model: ConditionItem, attributes: ["name"] },
      {
        model: Room,
        attributes: ["name", "code"],
        where: {
          [Op.and]: arrRoom,
        },
      },
    ],
  });
  // console.log(items)
  return items.map((item) => {
    return {
      codeInvent: item.codeInvent,
      nameItem: item.NameItem.name,
      condition: item.ConditionItem.name,
      room: item.Room?.name || null,
    };
  });
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

// const getAllItemAssignedByWorkUnit = async ({ id_work_unit }) => {
//   const data = await Inventory.findAll({
//     where: {
//       id_work_unit,
//     },
//     attributes: { exclude: ["createdAt", "updatedAt"] },
//   });

//   return data;
// };

const assignItemToRoom = async ({ id, code, id_work_unit }) => {
  const room = await checkRoom({ code: code, id_work_unit });

  const itemExist = await Inventory.findByPk(id);
  if (!itemExist) {
    throw new ResponseError(400, "Item not found");
  }

  return await itemExist.update({
    id_room: room.id,
  });
};

const changeStatusItem = async ({ id, status, id_work_unit }) => {
  const item = await Inventory.findOne({
    where: {
      id,
      id_work_unit,
    },
  });
  if (!item) {
    throw new ResponseError(400, "Item not found");
  }

  return await item.update({
    status,
  });
};

const getItemsListByWorkUnit = async ({ id_work_unit }) => {
  const data = await sequelize.query(
    "SELECT ni.name, COUNT(inventories.id_name_item) AS total FROM `name_items` ni LEFT JOIN `inventories` ON ni.id = inventories.id_name_item WHERE inventories.id_room IS NULL AND inventories.id_work_unit = :id_work_unit GROUP BY ni.id, ni.code, ni.name, ni.quantity;",
    {
      replacements: { id_work_unit: id_work_unit },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return data;
};

const getItemsConditionList = async ({ id_work_unit, code_room = null }) => {
  var room_rule = "IS NULL";
  if (code_room) {
    const { id } = await roomService.checkRoom({
      code: code_room,
      id_work_unit,
    });
    room_rule = `= ${id}`;
  }
  const data = await sequelize.query(
    "SELECT ni.name, COUNT(CASE WHEN inventories.status = 1 THEN 1 ELSE null END) AS baik, COUNT(CASE WHEN inventories.status = 2 THEN 1 ELSE null END) AS buruk, COUNT(inventories.id_name_item) AS total FROM `name_items` ni LEFT JOIN `inventories` ON ni.id = inventories.id_name_item WHERE inventories.id_room " +
      room_rule +
      " AND inventories.id_work_unit = 2 GROUP BY ni.id, ni.code, ni.name, ni.quantity;",
    {
      replacements: {
        id_work_unit: id_work_unit,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return data;
};

module.exports = {
  getAllInventoryAddedWorkUnit: getAll,
  addInventory: add,
  foundInventory,
  getAllItemUnsigned,
  // getAllItemAssignedByWorkUnit,
  assignItemToRoom,
  changeStatusItem,
  getItemsListByWorkUnit,
  getItemsConditionList,
};
