const { Added_item } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");
const nameItemService = require("./nameItemService");

module.exports = {
  addItem: async (quantity, added_date, id_name_item, description=null) => {
    await nameItemService.foundNameItem(id_name_item);
    await nameItemService.updateQuantity(id_name_item, quantity);
    return await Added_item.create({
      quantity, 
      added_date, 
      id_name_item,
      description,
    });
  },
  getAllItems: async () => {
    return await Added_item.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });
  },
  getItem: async (id) => {
    const item = await Added_item.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });

    if (!item) {
      throw new ResponseError(400, "Item not found");
    }

    return item;
  },
  updateItem: async (id) => {

  },
};


