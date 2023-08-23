const nameItemService = require("../../service/mysql/nameItemService");
const nameItemSchema = require("../../validation/nameItemSchema");
const { validation } = require("../../validation/validate");

module.exports = {
  handlerGetAllNameItem: async (req, res, next) => {
    try {
      const nameItems = await nameItemService.getAllNameItem();

      res.status(200).json({
        status: "success",
        message: "successfully get all Name Item",
        data: nameItems,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetNameItemById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const nameItem = await nameItemService.getNameItemById(id, "quantity");

      res.status(200).json({
        status: "success",
        message: "successfully get Name Item",
        data: nameItem,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetNameItemByType: async (req, res, next) => {
    try {
      const { id_type } = req.params;

      const { nameItems, type } = await nameItemService.getNameItemByType(
        id_type,
        "quantity"
      );

      res.status(200).json({
        status: "success",
        message: "successfully get Name Item by Type",
        type: type,
        data: nameItems,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerAddNameItem: async (req, res, next) => {
    try {
      const requestData = validation(nameItemSchema.addNameItemSchema, req.body);
      await nameItemService.addNameItem(
        requestData.code,
        requestData.name,
        requestData.id_type
      );

      res.status(201).json({
        status: "success",
        message: "successfully add Name Item",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerUpdateNameItem: async (req, res, next) => {
    try {
      const { id } = req.params;
      const requestData = validation(nameItemSchema.updatenameItemSchema, req.body);
      await nameItemService.updateNameItem(
        id,
        requestData.code,
        requestData.name,
      );

      res.status(200).json({
        status: "success",
        message: "successfully update Name Item",
      });
    } catch (error) {
      next(error);
    }
  },
  // handlerGetAllItems: async (req, res, next) => {
  //   try {
  //     const nameItems = await nameItemService.getAllNameItem();

  //     res.status(200).json({
  //       status: "success",
  //       message: "successfully get all Name Item",
  //       data: nameItems,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
};
