const { Op } = require("sequelize");
const {
  Inventory,
  Work_unit,
  Added_item,
  ConditionItem,
  NameItem,
  Room,
  Type,
  sequelize,
} = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const { addItemCondition } = require("./inventCondition");
const nameItemService = require("./nameItemService");
const { checkRoom } = require("./roomService");
const roomService = require("./roomService");
const addedItemServices = require("./addedItemServices");
const conditionItemService = require("./conditionItemService");
const distributionHistoryService = require("./distributionHistoryService");

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
    for (
      var loopVar = qtyLatest + 1;
      loopVar <= quantity + qtyLatest;
      loopVar++
    ) {
      const insertInvent = await Inventory.create(
        {
          codeInvent: loopVar.toString().padStart(3, "0"),
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
  // name_item = null,
  id_work_unit = null,
  code_room = null,
}) => {
  const arrItems = [];
  const arrRoom = [];
  // if (name_item) {
  //   const id_name_item = await nameItemService.getNameItemByName(name_item);
  //   arrItems.push({ id_name_item: id_name_item.id });
  // }
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
    attributes: ["codeInvent", "id"],
    include: [
      {
        model: Added_item,
        include: [
          {
            model: NameItem,
            attributes: ["name", "code"],
            include: [
              {
                model: Type,
              },
            ],
          },
        ],
      },
      { model: ConditionItem, attributes: ["name"] },
      {
        model: Room,
        attributes: ["name", "code"],
        where: {
          [Op.and]: arrRoom,
        },
      },
      { model: Work_unit },
    ],
  });

  return items.map((item) => {
    return {
      id: item.id,
      codeInvent:
        item.Added_item.NameItem.Type.code +
        "." +
        item.Work_unit.code +
        ".Smkmuh3." +
        item.Added_item.NameItem.code +
        "." +
        item.codeInvent,
      nameItem: item.Added_item.NameItem.name,
      condition: item.ConditionItem.name,
      room: item.Room?.name || null,
    };
  });
};

// const getAllItemUnsigned = async () => {
//   const data = await sequelize.query(
//     "SELECT ni.id, ni.code, ni.name, ni.quantity, COUNT(inventories.id_name_item) AS assigned, (ni.quantity - COUNT(inventories.id_name_item)) AS total FROM `name_items` ni LEFT JOIN `inventories` ON ni.id = inventories.id_name_item GROUP BY ni.id, ni.code, ni.name, ni.quantity HAVING (ni.quantity - COUNT(inventories.id_name_item)) > 0;",
//     { type: sequelize.QueryTypes.SELECT }
//   );

//   const newResult = data.map((item) => {
//     return {
//       id_name_item: item.id,
//       code: item.code,
//       name: item.name,
//       qty: item.quantity - item.assigned,
//     };
//   });

//   return newResult;
// };

// const getAllItemAssignedByWorkUnit = async ({ id_work_unit }) => {
//   const data = await Inventory.findAll({
//     where: {
//       id_work_unit,
//     },
//     attributes: { exclude: ["createdAt", "updatedAt"] },
//   });

//   return data;
// };

const assignItemToRoom = async ({
  quantity,
  id_added_item,
  code,
  id_work_unit,
}) => {
  const room = await checkRoom({ code: code, id_work_unit });
  if (!room) {
    throw new ResponseError(400, "Room not found");
  }

  const itemExist = await Inventory.count({
    where: {
      id_added_item,
      id_work_unit,
      status: 1,
      id_room: {
        [Op.is]: null,
      },
    },
  });

  if (!itemExist) {
    throw new ResponseError(400, "Item not found");
  }
  if (quantity > itemExist) {
    throw new ResponseError(400, `Max quantity is ${itemExist}`);
  }

  // return 0;
  // for (var x = 0; x < quantity; x++) {
  //   const value = await Inventory.findOne({
  //     where: {
  //       id_added_item,
  //       id_work_unit,
  //       status: 1,
  //       id_room: {
  //         [Op.is]: null,
  //       },
  //     },
  //   });

  //   await value.update({
  //     id_room: room.id,
  //   });
  // }
  const getIdInventory = await Inventory.findAll({
    where: {
      id_added_item,
      id_work_unit,
      status: 1,
      id_room: {
        [Op.is]: null,
      },
    },
    limit: quantity,
  });

  const arrIdInventory = getIdInventory.map((item) => {
    return item.id;
  });

  await Inventory.update(
    {
      id_room: room.id,
      dateAssign: new Date(),
    },
    {
      where: {
        id: arrIdInventory,
      },
    }
  );

  return;
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
    "SELECT inventories.id_added_item, name_items.name, COUNT(inventories.id_added_item) AS total, ai.added_date AS date FROM name_items JOIN `added_items` ai ON name_items.id = ai.id_name_item LEFT JOIN `inventories` ON ai.id = inventories.id_added_item WHERE inventories.id_room IS NULL AND inventories.id_work_unit = :id_work_unit GROUP BY ai.id;",
    {
      replacements: { id_work_unit: id_work_unit },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return data;
};

const getItemsConditionList = async ({ id_work_unit, code_room = null }) => {
  var room_rule = "";
  if (code_room) {
    // const { id } = await roomService.checkRoom({
    //   code: code_room,
    //   id_work_unit,
    // });
    const getId = await Room.findOne({
      where: {
        code: code_room,
        id_work_unit
      },
    });

   
    if (!getId) {
      return [];
    } else {
      room_rule = `AND inventories.id_room = ${getId.id}`;
    }
  }
  

  const data = await sequelize.query(
    "SELECT name_items.name, COUNT(CASE WHEN inventories.status = 1 THEN 1 ELSE null END) AS baik, COUNT(CASE WHEN inventories.status = 2 THEN 1 ELSE null END) AS buruk, COUNT(inventories.id_added_item) AS total, ai.added_date AS date FROM name_items JOIN `added_items` ai ON name_items.id = ai.id_name_item LEFT JOIN `inventories` ON ai.id = inventories.id_added_item WHERE inventories.id_work_unit = :id_work_unit " +
      room_rule +
      " GROUP BY ai.id;",
    {
      replacements: {
        id_work_unit: id_work_unit,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return data;
};

const addToInvent = async ({ id_added_item, id_work_unit, quantity }) => {
  await addedItemServices.getItem({ id: id_added_item });
  const dataQty = await sequelize.query(
    "SELECT ai.id, name_items.name, ai.quantity-COUNT(inventories.id_added_item) AS total, ai.added_date AS year FROM `name_items` JOIN `added_items` ai ON name_items.id = ai.id_name_item LEFT JOIN `inventories` ON ai.id = inventories.id_added_item WHERE ai.id = :id_added_item GROUP BY ai.id;",
    {
      replacements: { id_added_item: id_added_item },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  // if (!dataQty) {
  //   throw new ResponseError(400, "Item not found");
  // }

  const countInvent = await Inventory.findOne({
    where: {
      id_added_item: id_added_item,
      id_work_unit: id_work_unit,
    },
    order: [["codeInvent", "DESC"]],
  });
  const qtyLatest = parseInt(countInvent?.codeInvent || 0);

  // const { id_name_item } = await addedItemServices.getItem(id_added_item);
  // const countInvent = await sequelize.query(
  //   "SELECT COUNT(inventories.id) AS total FROM name_items JOIN added_items ON name_items.id = added_items.id_name_item JOIN inventories ON inventories.id_added_item = added_items.id WHERE name_items.id = :id_name_item;",
  //   {
  //     replacements: {
  //       id_name_item,
  //     },
  //     type: sequelize.QueryTypes.SELECT,
  //   }
  // );
  // const qtyLatest = countInvent[0].total || 0;

  if (quantity > dataQty[0]?.total || 0) {
    throw new ResponseError(400, `Max quantity is ${dataQty[0].total}`);
  }
  await distributionHistoryService.add({
    id_added_item,
    id_work_unit,
    qty: quantity,
  });
  // try {

  for (var x = qtyLatest + 1; x <= quantity + qtyLatest; x++) {
    await Inventory.create(
      {
        codeInvent: x.toString().padStart(3, "0"),
        id_added_item,
        id_work_unit,
      }
      // {
      //   transaction: t,
      // }
    );
    // await addItemCondition(insertInvent.id, 1, 1);
  }
  // return t.commit();

  return;
  // } catch (error) {
  //   // await t.rollback;
  //   return error;
  // }
};

const updateStatusItem = async ({ id, id_work_unit, status }) => {
  const item = await Inventory.findOne({
    where: {
      id,
      id_work_unit,
    },
  });
  console.log(id);
  if (!item) {
    throw new ResponseError(400, "Item not found");
  }
  // check status exist
  await conditionItemService.getById(status);
  console.log(item);
  return await item.update({
    status,
  });
};

const getHistoryDistributedRoom = async ({ id_work_unit, code_room }) => {
  return await sequelize.query(
    "SELECT name_items.name AS `name_item`, rooms.name as room, COUNT(inventories.id) as total, inventories.dateAssign FROM name_items JOIN added_items ON name_items.id = added_items.id_name_item RIGHT JOIN inventories ON inventories.id_added_item = added_items.id LEFT JOIN rooms ON inventories.id_room = rooms.id WHERE inventories.id_work_unit = :id_work_unit AND rooms.code = :code_room GROUP BY inventories.id_added_item, inventories.dateAssign, rooms.name;",
    {
      replacements: { id_work_unit: id_work_unit, code_room: code_room },
      type: sequelize.QueryTypes.SELECT,
    }
  );
};

module.exports = {
  getAllInventoryAddedWorkUnit: getAll,
  // addInventory: add,
  foundInventory,
  // getAllItemUnsigned,
  // getAllItemAssignedByWorkUnit,
  assignItemToRoom,
  changeStatusItem,
  getItemsListByWorkUnit,
  getItemsConditionList,
  addToInvent,
  updateStatusItem,
  getHistoryDistributedRoom,
};
