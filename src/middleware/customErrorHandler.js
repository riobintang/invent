const ResponseError = require("../util/responseError");

function customErrorHandler(err, req, res, next) {
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    return res
      .status(err.statusCode)
      .json({ status: "fail", message: err.message });
  } else if (err instanceof SyntaxError) {
    console.log(`JSON Error: ${err.message}`);
  } else if (err instanceof ReferenceError) {
    console.log(err.message);
    console.log(err.stack);
  } else {
    console.log(err.message);
    console.log(err.stack);
  }

  return res.status(500).json({
    status: "fail",
    message: "Error Internal Server",
  });
}

module.exports = customErrorHandler;
