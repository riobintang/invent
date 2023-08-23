// const sequelize = require("sequelize");
const { sequelize } = require('../../../sequelize/models')

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
  console.log(data);
  return newResult;
};


module.exports = {
    getAllItemUnsigned: getAllItemUnsigned,
}
