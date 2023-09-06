const addedItemServices = require("../../service/mysql/addedItemServices");
const addedItemSchema = require("../../validation/addedItemSchema");
const { validation } = require("../../validation/validate");

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
  handlerAddItem: async (req, res, next) => {
    try {
      const requestData = validation(addedItemSchema, req.body);

      await addedItemServices.addItem(
        requestData.quantity,
        requestData.added_date,
        requestData.id_name_item,
        requestData.description
      );

      res.status(201).json({
        status: "success",
        message: "successfully add Item",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetListItemDistribution: async (req, res, next) => {
    try {
      const data = await addedItemServices.getListUnassignItem();
      res.status(200).json({
        status: 'success',
        message: 'successfully get Items',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  // handlerPostItemDistributionToInvent: async (req, res, next) => {
  //   try {
      
  //   } catch (error) {
  //     next(error);
  //   }
  // }
};
