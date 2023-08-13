const Joi = require('joi');

const workUnitSchema = Joi.object({
    code: Joi.string().min(4).required(),
    name: Joi.string().min(2).required(),
    description: Joi.string(),
});

module.exports = workUnitSchema;

