const express = require('express');
const router = express.Router();

const tankRoutes = require("./tankRoutes");
router.use("/api/tanks",tankRoutes)

const animalRoutes = require("./animalRoutes");
router.use("/api/animals",animalRoutes)

const userRoutes = require("./userRoutes");
router.use("/api/users",userRoutes)

module.exports = router;