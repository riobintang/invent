const Joi = require("joi");

const roomDataSchema = Joi.object({
  name: Joi.string().min(1).required(),
  id_work_unit: Joi.number().min(1).required(),
});

module.exports = roomDataSchema;
