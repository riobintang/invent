const Joi = require("joi");

const nameItemSchema = Joi.object({
  code: Joi.string().min(3).max(3).required(),
  name: Joi.string().min(2).required(),
  id_type: Joi.number().min(1).required(),
});

module.exports = nameItemSchema;
