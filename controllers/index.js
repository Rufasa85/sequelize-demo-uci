const express = require('express');
const router = express.Router();

const tankRoutes = require("./tankRoutes");
router.use("/api/tanks",tankRoutes)

module.exports = router;