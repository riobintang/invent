const express = require("express");

const userRoute = require("./userRoute");
const roleRoute = require("./roleRoute");
const departmentRoute = require("./departmentRoute");

const router = express.Router();

// router.use("/api", publicRouter);
router.use("/api/users", userRoute);
router.use("/api/roles", roleRoute);
router.use("/api/departments", departmentRoute);
module.exports = router;
