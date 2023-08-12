const express = require("express");
const publicRouter = require("./publicRoute");
const route = require("./route");
const authToken = require('../middleware/authToken');
const router = express.Router();

router.use("/api", publicRouter);
router.use("/api", authToken, route);

module.exports = router;
