const { Room } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

const getAllRoomWorkUnit = async ({ id_work_unit }) => {
  return await Room.findAll({
    where: {
      id_work_unit,
    },
    attributes: ["id", "name"],
  });
};

const addRoom = async ({ name, id_work_unit }) => {
  return await Room.create({
    name,
    id_work_unit,
  });
};

const editRoom = async ({ id, name, id_work_unit }) => {
  const room = await checkRoom({id, id_work_unit});
  return await room.update({
    name,
  });
};

const checkRoom = async ({ id, id_work_unit }) => {
  const room = await Room.findOne({
    where: {
      id: id,
      id_work_unit: id_work_unit,
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
  checkRoom
};
