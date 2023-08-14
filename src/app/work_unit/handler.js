const workUnitService = require("../../service/mysql/workUnitService");
const { validation } = require("../../validation/validate");
const workUnitSchema = require("../../validation/workUnitSchema");

module.exports = {
  handlerGetAllWorkUnit: async (req, res, next) => {
    try {
      const workUnits = await workUnitService.getAllWorkUnit();
      res.status(200).json({
        status: "success",
        message: "successfully get all Work Unit",
        data: workUnits,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetWorkUnitById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const workUnit = await workUnitService.getWorkUnitById(id);
      res.status(200).json({
        status: "success",
        message: "successfully get Work Unit",
        data: workUnit,
      });
    } catch (error) {
      next(error);
    }
  },
  handlertAddWorkUnit: async (req, res, next) => {
    try {
      const requestData = validation(workUnitSchema, req.body);
      await workUnitService.addWorkUnit(
        requestData.code,
        requestData.name,
        requestData.description
      );
      res.status(201).json({
        status: "success",
        message: "successfully add Work Unit",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerUpdateWorkUnit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const requestData = validation(workUnitSchema, req.body);
      await workUnitService.updateWorkUnit(
        id,
        requestData.code,
        requestData.name,
        requestData.description
      );
      res.status(200).json({
        status: "success",
        message: "successfully update Work Unit",
      });
    } catch (error) {
      next(error);
    }
  },
};
