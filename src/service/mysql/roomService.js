const { Op } = require("sequelize");
const { Room } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

const getAllRoomWorkUnit = async ({ id_work_unit }) => {
  return await Room.findAll({
    where: {
      id_work_unit,
    },
    attributes: ["code", "name"],
  });
};

const addRoom = async ({ code, name, id_work_unit }) => {
  return await Room.create({
    code,
    name,
    id_work_unit,
  });
};

const editRoom = async ({ id, code, name, id_work_unit }) => {
  const room = await checkRoom({ id, id_work_unit });
  return await room.update({
    name,
    code,
  });
};

const checkRoom = async ({ id, code, id_work_unit }) => {
  const arr = [];
  if (id) {
    arr.push({id});
  }
  if (code) {
    arr.push({code});
  }
  if (id_work_unit) {
    arr.push({id_work_unit});
  }

  const room = await Room.findOne({
    where: {
      [Op.and]:arr,
    },
  });
  if (!room) {
    throw new ResponseError(400, "Room not found");
  }
  return room;
};

module.exports = {
  getAllRoomWorkUnit,
  add: addRoom,
  edit: editRoom,
  checkRoom,
};
