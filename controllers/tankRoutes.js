const express = require('express');
const router = express.Router();
const Tank = require('../models/Tank');

router.get("/",(req,res)=>{
    res.send("all the tanks here!")
})

module.exports = router;