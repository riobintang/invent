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
  handlerGetHistoryAssignedToRoom,
  // handlerGetAllAssignedItemsByWorkUnit,
} = require("../app/Inventory/handler");
const authAdmin = require("../middleware/authAdmin");
const authToken = require("../middleware/authToken");

const router = require("express").Router();

router.get("/", authToken, handlerGetAllInventoryByWorkUnit);
router.get("/assigned", authToken, handlerGetConditionItems);
router.get("/list", authToken, handlerGetItemsByRoom);
router.get("/all", authToken, authAdmin, handlerAllItems);
router.get("/:code_room", authToken, handlerGetHistoryAssignedToRoom);
// router.get("/notassigned", authToken, authAdmin, handlerGetAllUnsignedItems);


router.post("/", authToken, authAdmin, handlerAddInventory);
router.post("/assign", authToken, handlerAssignItemToRoom);

router.put("/:id", authToken, handlerUpdateStatusItem);

module.exports = router;
