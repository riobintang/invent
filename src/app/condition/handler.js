const conditionItemService = require("../../service/mysql/conditionItemService");

module.exports = {
  handlerGetAll: async (req, res, next) => {
    try {
      const data = await conditionItemService.getAll();

      res.status(200).json({
        status: "success",
        message: "successfully get Conditions",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await conditionItemService.getById(id);

      res.status(200).json({
        status: "success",
        message: "successfully get Condition",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
