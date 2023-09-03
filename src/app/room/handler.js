const roomService = require("../../service/mysql/roomService");
const userService = require("../../service/mysql/userService");
const roomDataSchema = require("../../validation/roomSchema");
const { editRoomDataSchema } = require("../../validation/roomSchema");

const { validation } = require("../../validation/validate");

module.exports = {
  getAllRoomByWorkUnitHandler: async (req, res, next) => {
    try {
      const { uuid } = req.user;
      const { id_work_unit } = await userService.getUserByUUID(uuid);

      const data = await roomService.getAllRoomWorkUnit({
        id_work_unit,
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
  addRoomHandler: async (req, res, next) => {
    try {
      const { uuid } = req.user;
      const { id_work_unit } = await userService.getUserByUUID(uuid);
      const { name, code } = validation(roomDataSchema, req.body);
      await roomService.add({ name, code, id_work_unit });
      res.status(201).json({
        status: "success",
        message: "successfully add Room",
      });
    } catch (error) {
      next(error);
    }
  },
  editRoomHandler: async (req, res, next) => {
    try {
      const { code_room } = req.params;
      const { uuid } = req.user;
      const { id_work_unit } = await userService.getUserByUUID(uuid);
      const { name, code } = validation(roomDataSchema, req.body);

      await roomService.edit({ code_old: code_room, name, code, id_work_unit });

      res.status(200).json({
        status: "success",
        message: "successfully update Room",
      });
    } catch (error) {
      next(error);
    }
  },
};
