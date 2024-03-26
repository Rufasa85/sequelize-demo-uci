const express = require("express");
const router = express.Router();
const Tank = require("../models/Tank");


//with promises
// router.get("/", (req, res) => {
//   Tank.findAll().then((data) => {
//     res.json(data);
//   }).catch(err=>{
//     console.log(err);
//     res.status(500).json({msg:"error occurred",err})
//   });
// });

//with async/await
router.get("/", async (req, res) => {
  try {
    const tankData = await Tank.findAll();
    res.json(tankData);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  }
});



router.get("/:id", (req, res) => {
  Tank.findByPk(req.params.id).then((data) => {
    if(data==null){
      return res.status(404).json({msg:"no such tank exists!"})
    }
    res.json(data);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  });;
});

router.post("/", (req, res) => {
  Tank.create(req.body).then((data) => {
    res.status(201).json(data);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  });;
});

router.post("/seed", (req, res) => {
  Tank.bulkCreate([
    {
      name: "tropical ocean",
      gallons: 5000,
      isSalt: true,
    },
    {
      name: "north pacific rockfish",
      gallons: 1200,
      isSalt: true,
    },
    {
      name: "lakes of washington",
      gallons: 300,
      isSalt: false,
    },
  ]).then(data=>{
    res.json(data);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  });
});

router.delete("/:id", (req, res) => {
  Tank.destroy({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    if(data===0){
      return res.status(404).json({msg:"no such tank exists!"})
    }
    res.json(data);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  });;
});

router.put("/:id", (req, res) => {
  Tank.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    if(data[0]===0){
      return res.status(404).json({msg:"no such tank exists!"})
    }
    res.json(data);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  });;
});

module.exports = router;
