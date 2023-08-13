const Joi = require("joi");

const departmentSchema = Joi.object(
    { 
        name: Joi.string().min(2).required(),
    });

module.exports = departmentSchema;
