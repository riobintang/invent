const express = require("express");

const {
  handlerGetAllTypes,
  handlerGetTypeById,
  handlerAddType,
  handlerUpdateType,
} = require("../app/type/handler");
const authToken = require("../middleware/authToken");
const checkAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/", authToken, handlerGetAllTypes);
router.get("/:id", authToken, handlerGetTypeById);
router.post("/", authToken, checkAdmin, handlerAddType);
router.put("/:id", authToken, checkAdmin, handlerUpdateType);

module.exports = router;
