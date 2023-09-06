const express = require("express");

const {
  handlerGetAllItems,
  handlerGetItemById,
  handlerAddItem,
  handlerGetListItemDistribution,
} = require("../app/added_item/handler");
const authToken = require("../middleware/authToken");
const checkAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.get("/", authToken, checkAdmin, handlerGetAllItems);
router.get("/distribution", authToken, checkAdmin, handlerGetListItemDistribution);
router.get("/:id", authToken, checkAdmin, handlerGetItemById);


router.post('/', authToken, checkAdmin, handlerAddItem);
// router.post("/distribution", authToken, checkAdmin)
module.exports = router;
