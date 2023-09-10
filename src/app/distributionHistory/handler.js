const distributionHistoryService = require("../../service/mysql/distributionHistoryService");

module.exports = {
  handlerGetAll: async (req, res, next) => {
    try {
      const data = await distributionHistoryService.getAll();

      res.status(200).json({
        status: "success",
        message: "successfully get Distribution Histories",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
