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

const addHistory = async ({ qty, id_added_item, id_work_unit }) => {
  const dataQty = await sequelize.query(
    "SELECT added_items.id, distributionhistories.id_work_unit, SUM(distributionhistories.qty) AS total FROM added_items JOIN distributionhistories ON added_items.id = distributionhistories.id_added_item WHERE distributionhistories.id_added_item = :id_added_item",
    {
      replacements: { id_added_item },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  console.log(dataQty);
  const quantity = dataQty[0] || 0;
  // console.log(dataQty[0].total);
  if (quantity < qty) {
    throw new ResponseError(400, `Max quantity is ${dataQty.total}`);
  }

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
