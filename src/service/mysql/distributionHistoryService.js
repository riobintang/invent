const {
  DistributionHistory,
  Added_item,
  NameItem,
  Work_unit,
  sequelize,
} = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

const getAll = async () => {
  const data = await DistributionHistory.findAll({
    include: [
      { model: Added_item, include: [{ model: NameItem }] },
      { model: Work_unit },
    ],
  });

  return data.map((item) => {
    return {
      name_item: item.Added_item.NameItem.name,
      work_unit: item.Work_unit.name,
      qty: item.qty,
      createdAt: item.createdAt,
    };
  });
};

const addHistory = async ({ qty, id_added_item, id_work_unit, quantityAddedItem, }) => {
  // const dataQty = await sequelize.query(
  //   "SELECT added_items.id, distributionhistories.id_work_unit, SUM(distributionhistories.qty) AS total FROM added_items JOIN distributionhistories ON added_items.id = distributionhistories.id_added_item WHERE distributionhistories.id_added_item = :id_added_item GROUP BY distributionhistories.id_work_unit, distributionhistories.id_work_unit;",
  //   {
  //     replacements: { id_added_item: id_added_item },
  //     type: sequelize.QueryTypes.SELECT,
  //   }
  // );
  // console.log(dataQty);
  // const total = dataQty[0]?.total || quantityAddedItem;
  // // console.log(dataQty[0].total);
  // if (total < qty) {
  //   throw new ResponseError(400, `Max quantity is ${total}`);
  // }
  // console.log(total);
  return await DistributionHistory.create({
    qty,
    id_added_item,
    id_work_unit,
  });
};

module.exports = {
  getAll,
  add: addHistory,
};
