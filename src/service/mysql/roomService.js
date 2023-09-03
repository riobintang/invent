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
  await checkCodeExist({ code, id_work_unit });
  return await Room.create({
    code,
    name,
    id_work_unit,
  });
};

const editRoom = async ({ code, name, id_work_unit, code_old }) => {
  const room = await checkRoom({ id_work_unit, code: code_old });
  await checkCodeExist({ code, id_work_unit, id: room.id });
  return await room.update({
    name,
    code,
  });
};

const checkRoom = async ({ id = null, code, id_work_unit }) => {
  const arr = [];
  if (id) {
    arr.push({ id });
  }
  if (code) {
    arr.push({ code });
  }
  if (id_work_unit) {
    arr.push({ id_work_unit });
  }
  const room = await Room.findOne({
    where: {
      [Op.and]: arr,
    },
  });
  if (!room) {
    throw new ResponseError(400, "Room not found");
  }
  return room;
};

const checkCodeExist = async ({ id = null, code, id_work_unit, count = 0 }) => {
  const room = await Room.count({
    where: {
      id_work_unit,
      code: code,
      id: {
        [Op.ne]: id,
      },
    },
  });

  if (room > count) {
    throw new ResponseError(400, "Code has been used");
  }

  return;
};

module.exports = {
  getAllRoomWorkUnit,
  add: addRoom,
  edit: editRoom,
  checkRoom,
};
