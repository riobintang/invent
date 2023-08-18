const typeService = require("../../service/mysql/typeService");
const typeSchema = require("../../validation/typeSchema");
const { validation } = require("../../validation/validate");

module.exports = {
  handlerGetAllTypes: async (req, res, next) => {
    try {
      const types = await typeService.getAllTypes();
      res.status(200).json({
        status: "success",
        message: "successfully get all Types",
        data: types,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetTypeById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const type = await typeService.getTypeById(id);
      res.status(200).json({
        status: "success",
        message: "successfully get Type",
        data: type,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerAddType: async (req, res, next) => {
    try {
      const requestData = validation(typeSchema, req.body);
      await typeService.addType(requestData.code, requestData.name, requestData.description);
      res.status(201).json({
        status: "success",
        message: "successfully add Type",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerUpdateType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const requestData = validation(typeSchema, req.body);

      await typeService.updateType(id, requestData.code, requestData.name, requestData.description);
      res.status(200).json({
        status: "success",
        message: "successfully update Type",
      });
    } catch (error) {
      next(error);
    }
  },
};
