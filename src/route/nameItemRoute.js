const { handlerGetAllItemUnsigned } = require("../app/itemDistribution/handler");
const {
  handlerGetAllNameItem,
  handlerGetNameItemById,
  handlerAddNameItem,
  handlerUpdateNameItem,
  handlerGetNameItemByType,
} = require("../app/nameItem/handler");
const checkAdmin = require("../middleware/authAdmin");
const authToken = require("../middleware/authToken");

const router = require("express").Router();

router.post("/nameitems", authToken, checkAdmin, handlerAddNameItem);
router.put("/nameitems/:id", authToken, checkAdmin, handlerUpdateNameItem);
router.get("/nameitems/notassigned", authToken, checkAdmin, handlerGetAllItemUnsigned);

router.get('/:id_type/nameitems', authToken, checkAdmin, handlerGetNameItemByType);
// router.get("/nameitems", authToken, checkAdmin, handlerGetAllNameItem);
router.get("/:id_type/nameitems/:id", authToken, checkAdmin, handlerGetNameItemById);



module.exports = router;
