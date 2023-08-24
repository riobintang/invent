
const { Added_item, NameItem } = require("../../../sequelize/models");
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
  getAllItems: async (year=null) => {
    const items=  await Added_item.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: [{model: NameItem}]
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
      }
    });
    return result;
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


