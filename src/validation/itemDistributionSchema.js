const Joi = require('joi');

const distributionItemSchema = Joi.object({
    id_item: Joi.number().min(1).required(),
    id_work_unit: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required(),
});

module.exports = distributionItemSchema;