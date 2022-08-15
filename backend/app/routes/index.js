const express = require("express");
const router = express.Router();

router.use(`/auth`, require("./authRoutes"));
router.use(`/dashboards`, require("./dashboardRoutes"));

module.exports = router;
