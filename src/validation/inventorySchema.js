const Joi = require("joi");

const inventorySchema = Joi.object({
  quantity: Joi.number().min(1).required(),
  id_name_item: Joi.number().min(1).required(),
  id_work_unit: Joi.number().min(1).required(),
});

const addItemToRoom = Joi.object({
  id_room: Joi.number().min(1).required(),
});

module.exports = { inventorySchema, addItemToRoom };
