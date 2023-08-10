const ResponseError = require("../util/responseError.js");

function validation(schema, data) {
    const validateData = schema.validate(data);
    if (validateData.err) {
        throw new ResponseError(400, validateData.err);
    }
    return validateData.value;
}

module.exports = {
    validation
}