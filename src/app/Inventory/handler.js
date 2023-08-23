const inventoryService = require("../../service/mysql/inventoryService");
const nameItemService = require("../../service/mysql/nameItemService");
const workUnitService = require("../../service/mysql/workUnitService");
const inventorySchema = require("../../validation/inventorySchema");
const { validation } = require("../../validation/validate");

module.exports = {
  handlerGetAllInventoryByWorkUnit: async (req, res, next) => {
    try {
      const data = await inventoryService.getAllInventory;
    } catch (error) {
      next(error);
    }
  },
  handlerAddInventory: async (req, res, next) => {
    try {
      const requestData = validation(inventorySchema, req.body);
      await inventoryService.addInventory(
        requestData.quantity,
        requestData.id_name_item,
        requestData.id_work_unit
      );
      res.status(201).json({
        status: "success",
        message: "successfully assign items to work unit",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetAllInventory: async (req, res, next) => {
    try {
      const { unit } = req.query;
      var id_work_unit = null;
      if (unit) {
        id_work_unit = await workUnitService.searchWorkUnit(
          (nameWorkUnit = unit)
        );
      }
      const data = await inventoryService.getAllInventory(id_work_unit);

      res.status(200).json({
        status: "success",
        message: "successfully get Inventory",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetAllUnsignedItems: async (req, res, next) => {
    try {
      const data = await inventoryService.getAllItemUnsigned();

      res.status(200).json({
        status: "success",
        message: "successfully get All Total Items",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerAllItems: async (req, res, next) => {
    try {
      const data = await nameItemService.getAllNameItem();
      res.status(200).json({
        status: "success",
        message: "successfully get All Items",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
