const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/api/users",userRoutes)

const tankRoutes = require("./tankRoutes");
router.use("/api/tanks",tankRoutes)

const animalRoutes = require("./animalRoutes");
router.use("/api/animals",animalRoutes)

const fanRoutes = require("./fanRoutes");
router.use("/api/fans",fanRoutes)

module.exports = router;
