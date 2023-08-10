function errorNotFound(req, res, next)  {
    res.status(404).json({
        status: "error",
        message: "Not Found"
    })
}

module.exports = errorNotFound;