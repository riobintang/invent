const { handlerGetAll } = require("../app/distributionHistory/handler");
const authAdmin = require("../middleware/authAdmin");
const authToken = require("../middleware/authToken");

const router = require("express").Router();

router.get("/", authToken, authAdmin, handlerGetAll);

module.exports = router;
