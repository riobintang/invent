const express = require("express");
const router = express.Router();

const {
  handlerGetDepartments,
  handlerGetDepartmentById,
} = require("../app/department/handler");
const authToken = require("../middleware/authToken");
const checkAdmin = require("../middleware/authAdmin");

router.get("/", authToken, checkAdmin, handlerGetDepartments);
router.get("/:id", authToken, checkAdmin, handlerGetDepartmentById);

module.exports = router;
