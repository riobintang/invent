const addedItemServices = require("../../service/mysql/addedItemServices");

module.exports = {
  handlerGetAllItems: async (req, res, next) => {
    try {
      const items = await addedItemServices.getAllItems();
      res.status(200).json({
        status: "success",
        message: "successfully get all Items",
        data: items,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetItemById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await addedItemServices.getItem(id);
      res.status(200).json({
        status: "success",
        message: "successfully get Item",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  },
};
