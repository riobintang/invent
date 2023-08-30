const Joi = require("joi");

const addNameItemSchema = Joi.object({
  code: Joi.string().min(3).max(3).required(),
  name: Joi.string().min(2).required(),
  id_type: Joi.number().min(1).required(),
});

const updateNameItemSchema = Joi.object({
  code: Joi.string().min(3).max(3).required(),
  name: Joi.string().min(2).required(),
});

module.exports = {
  addNameItemSchema,
  updateNameItemSchema,
};
