const { Room } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

const getAllRoomWorkUnit = async ({ id_work_unit }) => {
  return await Room.findAll({
    where: {
      id_work_unit,
    },
  });
};

const addRoom = async ({ name, id_work_unit }) => {
  return await Room.create({
    name,
    id_work_unit,
  });
};

const editRoom = async ({ id, name }) => {
  const room = await Room.findByPk(id);
  if (!room) {
    throw new ResponseError(400, "Room not found");
  }
  return await Room.update({
    name,
  });
};

module.exports = {
  getAllRoomWorkUnit,
  add: addRoom,
  edit: editRoom,
};
