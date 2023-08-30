const roomService = require("../../service/mysql/roomService");
const userService = require("../../service/mysql/userService");
const roomDataSchema = require("../../validation/roomSchema");
const { editRoomDataSchema } = require("../../validation/roomSchema");

const { validation } = require("../../validation/validate");

module.exports = {
  getAllRoomByWorkUnit: async (req, res, next) => {
    try {
      const { uuid } = req.user;
      const { Work_unit } = await userService.getUserByUUID(uuid);

      const data = await roomService.getAllRoomWorkUnit({
        id_work_unit: Work_unit.id,
      });
      res.status(200).json({
        status: "success",
        message: "successfully get All Room",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  addRoom: async (req, res, next) => {
    try {
      const requestData = validation(roomDataSchema, req.body);

      await roomService.add(requestData);
      res.status(201).json({
        status: "success",
        message: "successfully add Room",
      });
    } catch (error) {
      next(error);
    }
  },
  editRoom: async (req, res, next) => {
    try {
        const requestData = validation(roomDataSchema, req.body);
    } catch (error) {
        next(error);
    }
  }
};
