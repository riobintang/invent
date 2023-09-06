const {
  Added_item,
  NameItem,
  sequelize,
} = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const nameItemService = require("./nameItemService");

const addItem = async (
  quantity,
  added_date,
  id_name_item,
  description = null
) => {
  await nameItemService.foundNameItem(id_name_item);
  await nameItemService.updateQuantity(id_name_item, quantity);

  return await Added_item.create({
    quantity,
    added_date,
    id_name_item,
    description,
  });
};

const getAllItems = async (year = null) => {
  const items = await Added_item.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [{ model: NameItem }],
  });

  const itemsJSON = items.map((item) => {
    return item.toJSON();
  });

  const result = itemsJSON.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
      added_date: item.added_date,
      description: item.description,
      name_item: item.NameItem.name,
    };
  });
  return result;
};

const getItem = async (id) => {
  const item = await Added_item.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!item) {
    throw new ResponseError(400, "Item not found");
  }

  return item;
};

const getListUnassignItem = async () => {
  const data = await sequelize.query(
    "SELECT ai.id, name_items.name, ai.quantity-COUNT(inventories.id_added_item) AS total, ai.added_date AS date FROM `name_items` JOIN `added_items` ai ON name_items.id = ai.id_name_item LEFT JOIN `inventories` ON ai.id = inventories.id_added_item GROUP BY ai.id;",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return data;
};

// const addToInvent = async ({ id_added_item, id_work_unit, quantity }) => {
//   const dataQty = await sequelize.query(
//     "SELECT ai.id, name_items.name, ai.quantity-COUNT(inventories.id_added_item) AS total, ai.added_date AS year FROM `name_items` JOIN `added_items` ai ON name_items.id = ai.id_name_item LEFT JOIN `inventories` ON ai.id = inventories.id_added_item WHERE ai.id = :id_added_item GROUP BY ai.id;",
//     {
//       replacements: { id_added_item: id_added_item },
//       type: sequelize.QueryTypes.SELECT,
//     }
//   );
    
//   if (!dataQty) {
//     throw new ResponseError(400, "Item not found");
//   }

//   // const countInvent = await Inventory.findOne({
//   //   where: {
//   //     id_added_item,
//   //     id_work_unit,
//   //   },
//   //   order: [["codeInvent", "DESC"]],
//   // });
//   const { id_name_item } = await getItem(id_added_item);
//   const countInvent = await sequelize.query(
//     "SELECT COUNT(inventories.id) FROM name_items JOIN added_items ON name_items.id = added_items.id_name_item JOIN inventories ON inventories.id_added_item = added_items.id WHERE name_items.id = :id_name_item;",
//     {
//       replacements: {
//         id_name_item,
//       },
//     }
//   );
//   const qtyLatest = countInvent || 0;

//   if (quantity > dataQty[0].total) {
//     throw new ResponseError(400, `Max quantity is ${dataQty[0].total}`);
//   }
//   try {
//     for (var x = qtyLatest + 1; x <= quantity + qtyLatest; x++) {
//       await Inventory.create(
//         {
//           codeInvent: x.toString().padStart(3, "0"),
//           id_added_item,
//           id_work_unit,
//         }
//         // {
//         //   transaction: t,
//         // }
//       );
//       // await addItemCondition(insertInvent.id, 1, 1);
//     }
//     // return t.commit();
//     return;
//   } catch (error) {
//     // await t.rollback;
//   }
// };

module.exports = {
  addItem,
  getAllItems,
  getItem,
  //updateItem: async (id) => {},
  getListUnassignItem,
  // addToInvent,
};
