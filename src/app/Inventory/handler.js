const inventoryService = require("../../service/mysql/inventoryService");
const nameItemService = require("../../service/mysql/nameItemService");
const roomService = require("../../service/mysql/roomService");
const userService = require("../../service/mysql/userService");
const workUnitService = require("../../service/mysql/workUnitService");
const {
  inventorySchema,
  addItemToRoom,
  updateStatusItem,
} = require("../../validation/inventorySchema");
const { validation } = require("../../validation/validate");

module.exports = {
  handlerGetAllInventoryByWorkUnit: async (req, res, next) => {
    try {
      const { uuid } = req.user;
      // const { nameitem } = req.query;

      const { id_work_unit } = await userService.getUserByUUID(uuid);
      const data = await inventoryService.getItemsListByWorkUnit({
        id_work_unit: id_work_unit,
      });
      res.status(200).json({
        status: "success",
        message: "successfully get Inventories",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerAddInventory: async (req, res, next) => {
    try {
      const requestData = validation(inventorySchema, req.body);
      console.log(requestData);
      await inventoryService.addToInvent(requestData);
      res.status(201).json({
        status: "success",
        message: "successfully assign items to work unit",
      });
    } catch (error) {
      next(error);
    }
  },
  // handlerGetAllInventory: async (req, res, next) => {
  //   try {
  //     const { unit } = req.query;
  //     var id_work_unit = null;
  //     if (unit) {
  //       id_work_unit = await workUnitService.searchWorkUnit(
  //         (nameWorkUnit = unit)
  //       );
  //     }
  //     const data = await inventoryService.getAllInventory({ id_work_unit });

  //     res.status(200).json({
  //       status: "success",
  //       message: "successfully get Inventory",
  //       data: data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  // handlerGetAllUnsignedItems: async (req, res, next) => {
  //   try {
  //     const data = await inventoryService.getAllItemUnsigned();

  //     res.status(200).json({
  //       status: "success",
  //       message: "successfully get All Total Items",
  //       data: data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
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
  // handlerGetAllAssignedItemsByWorkUnit: async (req, res, next) => {
  //   try {
  //     const { uuid } = req.user;
  //     const { id_work_unit } = await userService.getUserByUUID(uuid);
  //     const data = await inventoryService.getAllItemAssignedByWorkUnit({
  //       id_work_unit: id_work_unit,
  //     });

  //     res.status(200).json({
  //       status: "success",
  //       message: "successfully get All Assigned Items",
  //       data: data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  handlerAssignItemToRoom: async (req, res, next) => {
    try {
      const { uuid } = req.user;
      // const { id } = req.params;
      const { id_work_unit } = await userService.getUserByUUID(uuid);
      const { code, id_added_item, quantity } = validation(addItemToRoom, req.body);
      // console.log(id);
      await inventoryService.assignItemToRoom({ id_added_item, quantity, code, id_work_unit });

      res.status(200).json({
        status: "success",
        message: "successfully assign Item to Room",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetItemsByRoom: async (req, res, next) => {
    try {
      const { uuid } = req.user;
      const { code_room } = req.query;
      const { id_work_unit } = await userService.getUserByUUID(uuid);
 
      const data = await inventoryService.getAllInventoryAddedWorkUnit({
        id_work_unit,
        code_room,
      });

      res.status(200).json({
        status: "success",
        message: "successfully get Items",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetConditionItems: async (req, res, next) => {
    try {
      const { uuid } = req.user;
      const { code_room } = req.query;
      const { id_work_unit } = await userService.getUserByUUID(uuid);

      const data = await inventoryService.getItemsConditionList({
        id_work_unit,
        code_room,
      });
      res.status(200).json({
        status: "success",
        message: "successfully get Items",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerUpdateStatusItem: async (req, res, next) => {
    try {
      const { uuid } = req.user;
      const { id } = req.params;
      const { id_work_unit } = await userService.getUserByUUID(uuid);
      const requestData = validation(updateStatusItem, req.body);
      requestData.id = id;
      requestData.id_work_unit = id_work_unit;
      console.log(requestData)
      await inventoryService.updateStatusItem(requestData);
      res.status(200).json({
        status: "success",
        message: "successfully update status Item",
      });
    } catch (error) {
      next(error);
    }
  },
};
