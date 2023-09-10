const express = require("express");

const userRoute = require("./userRoute");
const roleRoute = require("./roleRoute");
// const departmentRoute = require("./departmentRoute");
const added_itemRoute = require("./added_itemRoute");
const typeRoute = require("./typeRoute");
const nameItemRoute = require("./nameItemRoute");
const workUnitRoute = require("./workUnitRoute");
const inventoryRoute = require("./inventoryRoute");

const roomRoute = require("./roomRoute");
const conditionRoute = require("./conditionRoute");
const router = express.Router();

// router.use("/api", publicRouter);
router.use("/api/users", userRoute);
router.use("/api/roles", roleRoute);
// router.use("/api/departments", departmentRoute);
router.use("/api/workunits", workUnitRoute);
router.use("/api/types", typeRoute);
router.use("/api/types", nameItemRoute); // It will read /api/types/nameitems
router.use("/api/inventories", inventoryRoute);
router.use("/api/addeditems", added_itemRoute);

router.use("/api/rooms", roomRoute);
router.use("/api/conditions", conditionRoute);
module.exports = router;
