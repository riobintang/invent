const {
  handlerAddInventory,
  handlerGetAllUnsignedItems,
  handlerAllItems,
  handlerGetAllInventory,
  handlerGetAllInventoryByWorkUnit,
  handlerAssignItemToRoom,
  handlerGetItemsByRoom,
  handlerGetConditionItems,
  handlerUpdateStatusItem,
  // handlerGetAllAssignedItemsByWorkUnit,
} = require("../app/Inventory/handler");
const authAdmin = require("../middleware/authAdmin");
const authToken = require("../middleware/authToken");

const router = require("express").Router();

router.get("/", authToken, handlerGetAllInventoryByWorkUnit);
router.get("/assigned", authToken, handlerGetConditionItems);
router.get("/list", authToken, handlerGetItemsByRoom);

// router.get("/notassigned", authToken, authAdmin, handlerGetAllUnsignedItems);
router.get("/all", authToken, authAdmin, handlerAllItems);

router.post("/", authToken, authAdmin, handlerAddInventory);
router.post("/assign/:id", authToken, handlerAssignItemToRoom);

router.put("/:id", authToken, handlerUpdateStatusItem);

module.exports = router;
