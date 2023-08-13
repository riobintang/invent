const Joi = require('joi');

const addedItemSchema = Joi.object({
    quantity: Joi.number().min(1).required(),
    year: Joi.string().min(2).required(),
    specification: Joi.string().min(2).required(),
});