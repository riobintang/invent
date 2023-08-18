const ResponseError = require("../util/responseError.js");

function validation(schema, data) {
    const validateData = schema.validate(data);
    if (validateData.error) {
        throw new ResponseError(400, validateData.error);
    }
    return validateData.value;
}

module.exports = {
    validation
}