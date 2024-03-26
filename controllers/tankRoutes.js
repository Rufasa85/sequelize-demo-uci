const express = require('express');
const router = express.Router();
const Tank = require('../models/Tank');

router.get("/",(req,res)=>{
   Tank.findAll().then(data=>{
    res.json(data)
   })
})
router.get("/salties",(req,res)=>{
   Tank.findAll({
    where:{
        isSalt:true
    }
   }).then(data=>{
    res.json(data)
   })
})

router.get("/:id",(req,res)=>{
   Tank.findByPk(req.params.id).then(data=>{
    res.json(data)
   })
})

router.post("/",(req,res)=>{
   Tank.create({
    name:req.body.name,
    gallons:req.body.gallons,
    isSalt:req.body.isSalt
   }).then(data=>{
    res.json(data)
   })
})

module.exports = router;