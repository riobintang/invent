const express = require("express");

const {
  handlerGetAllItems,
  handlerGetItemById,
} = require("../app/added_item/handler");
const authToken = require("../middleware/authToken");
const checkAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/", authToken, checkAdmin, handlerGetAllItems);
router.get("/:id", authToken, checkAdmin, handlerGetItemById);

module.exports = router;
