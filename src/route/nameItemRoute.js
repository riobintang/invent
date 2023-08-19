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
router.get('/:id_type/nameitems', authToken, checkAdmin, handlerGetNameItemByType);
// router.get("/nameitems", authToken, checkAdmin, handlerGetAllNameItem);
router.get("/:id_type/nameitems/:id", authToken, checkAdmin, handlerGetNameItemById);



module.exports = router;
