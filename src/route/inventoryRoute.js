const {
  handlerAddInventory,
  handlerGetAllUnsignedItems,
  handlerAllItems,
} = require("../app/Inventory/handler");
const authAdmin = require("../middleware/authAdmin");
const authToken = require("../middleware/authToken");

const router = require("express").Router();

router.get("/notassigned", authToken, authAdmin, handlerGetAllUnsignedItems);
router.get("/all", authToken, authAdmin, handlerAllItems);
router.post("/", authToken, authAdmin, handlerAddInventory);

module.exports = router;
