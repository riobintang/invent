const Joi = require("joi");

const addedItemSchema = Joi.object({
  quantity: Joi.number().min(1).required(),
  added_date: Joi.string().min(2).required(),
  id_name_item: Joi.number().min(1).required(),
  description: Joi.string(),
});

module.exports = addedItemSchema;
