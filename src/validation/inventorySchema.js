const Joi = require("joi");

const inventorySchema = Joi.object({
  quantity: Joi.number().min(1).required(),
  id_added_item: Joi.number().min(1).required(),
  id_work_unit: Joi.number().min(1).required(),
});

const addItemToRoom = Joi.object({
  code: Joi.string().min(1).required(),
  id_added_item: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

const updateStatusItem = Joi.object({
  status: Joi.number().min(1).required(),
});

module.exports = { inventorySchema, addItemToRoom, updateStatusItem };
