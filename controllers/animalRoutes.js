const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

router.get("/",(req,res)=>{
   Animal.findAll().then(data=>{
    res.json(data)
   })
})

router.get("/:id",(req,res)=>{
   Animal.findByPk(req.params.id).then(data=>{
    res.json(data)
   })
})

router.post("/",(req,res)=>{
   Animal.create({
    name:req.body.name,
    species:req.body.species,
    color:req.body.color
   }).then(data=>{
    res.json(data)
   })
})

module.exports = router;