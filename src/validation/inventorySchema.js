const Joi = require('joi');

const inventorySchema = Joi.object({
    codeInvent: Joi.string().min(3).required(),
    quantity: Joi.number().min(1).required(),
    id_added_item: Joi.number().min(1).required(),
    id_work_unit: Joi.number().min(1).required(),
});

module.exports = inventorySchema;