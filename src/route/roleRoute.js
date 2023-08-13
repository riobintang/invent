const express = require("express");
const router = express.Router();

const { handlerGetRoles, handlerGetRoleById } = require("../app/role/handler");
const authToken = require("../middleware/authToken");
const checkAdmin = require("../middleware/authAdmin");

router.get("/", authToken, checkAdmin, handlerGetRoles);
router.get("/:id", authToken, checkAdmin, handlerGetRoleById);

module.exports = router;
