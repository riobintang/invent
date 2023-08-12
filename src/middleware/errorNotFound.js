function errorNotFound(req, res, next)  {
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    })
}

module.exports = errorNotFound;