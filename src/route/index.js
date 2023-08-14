const express = require("express");

const userRoute = require("./userRoute");
const roleRoute = require("./roleRoute");
const departmentRoute = require("./departmentRoute");
const added_itemRoute = require("./added_itemRoute");
const typeRoute = require('./typeRoute');
const router = express.Router();

// router.use("/api", publicRouter);
router.use("/api/users", userRoute);
router.use("/api/roles", roleRoute);
router.use("/api/departments", departmentRoute);
router.use("/api/addeditems", added_itemRoute);
router.use("/api/types", typeRoute);

module.exports = router;
