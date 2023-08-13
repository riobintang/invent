const { Added_item } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

module.exports = {
  addItem: async () => {},
  getAllItems: async () => {
    return await Added_item.findAll();
  },
  getItem: async (id) => {
    const item = await Added_item.findByPk(id);

    if (!item) {
      throw new ResponseError(400, "Item not found");
    }

    return item;
  },
  updateItem: async () => {},
};
