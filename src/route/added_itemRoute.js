const express = require("express");

const {
  handlerGetAllItems,
  handlerGetItemById,
  handlerAddItem,
} = require("../app/added_item/handler");
const authToken = require("../middleware/authToken");
const checkAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/", authToken, checkAdmin, handlerGetAllItems);
router.get("/:id", authToken, checkAdmin, handlerGetItemById);
router.post('/', authToken, checkAdmin, handlerAddItem);

module.exports = router;
