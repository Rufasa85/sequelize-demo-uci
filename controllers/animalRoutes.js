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

router.post("/seed", (req, res) => {
   Animal.bulkCreate([
     {
       name: "Barbara",
       species: "manatee"
     },
     {
      name: "Flipper",
      species: "bottlenose dolphin"
    },
    {
      name: "Dr.",
      species: "octopus",
      color:"reddish orange"
    },
   ]).then(data=>{
     res.json(data);
   })
 });
 
 router.delete("/:id", (req, res) => {
   Animal.destroy({
     where: {
       id: req.params.id,
     },
   }).then((data) => {
     res.json(data);
   });
 });
 
 router.put("/:id", (req, res) => {
   Animal.update(req.body, {
     where: {
       id: req.params.id,
     },
   }).then((data) => {
     res.json(data);
   });
 });

module.exports = router;