const Joi = require("joi");

const typeSchema = Joi.object({
  code: Joi.string().min(2).required(),
  name: Joi.string().min(2).required(),
});


module.exports = typeSchema;
