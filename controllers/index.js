const express = require('express');
const router = express.Router();

const tankRoutes = require("./tankRoutes");
router.use("/api/tanks",tankRoutes)

const animalRoutes = require("./animalRoutes");
router.use("/api/animals",animalRoutes)

module.exports = router;