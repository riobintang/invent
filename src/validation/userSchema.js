const Joi = require("joi");

const addUserSchema = Joi.object({
    username: Joi.string().min(4).required(),
    id_department: Joi.number().min(1).required(),
    // id_role: Joi.number().min(1).required(),
});

const loginUserSchema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
});

module.exports = {
    addUserSchema,
    loginUserSchema,
}