const ResponseError = require("../util/responseError");
const jwt = require('jsonwebtoken');
function authToken(req, res, next) {
    //console.log(req.headers)
    const authHeader = req.headers["authorization"];
    //console.log(authHeader)
    if (!authHeader){
        throw new ResponseError(401, "Login is required");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new ResponseError(401, "Login is required");
    }

    const decoded = jwt.verify(token, process.env.private);

    req.user = {
        uuid: decoded.uuid,
        value: decoded.value,
    }

    return next();
}

module.exports = authToken;