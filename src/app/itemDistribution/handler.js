const itemDistribution = require("../../service/mysql/itemDistribution");
const nameItemService = require("../../service/mysql/nameItemService");
const distributionItemSchema = require("../../validation/itemDistributionSchema");
const { validation } = require("../../validation/validate");

module.exports = {
  handlerGetAllItem: async (req, res, next) => {
    try {
      const data = await nameItemService.getAllNameItem();

      res.status(200).json({
        status: "success",
        message: "successfully get Items",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerDistributedItem: async (req, res, next) => {
    try {
      const requestData = validation(distributionItemSchema, req.body);
    } catch (error) {
      next(error);
    }
  },
  handlerGetAllItemUnsigned: async (req, res, next) => {
    try {
      const data = await itemDistribution.getAllItemUnsigned();

      res.status(200).json({
        status: "success",
        message: "successfully get All Item Unsigned",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
