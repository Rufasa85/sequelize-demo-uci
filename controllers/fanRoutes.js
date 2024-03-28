const express = require("express");
const router = express.Router();
const {Animal,Fan} = require("../models");

router.get("/", async (req, res) => {
  try {
    const data = await Fan.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Fan.findByPk(req.params.id,{
      include:[Animal]
    });
    if (data == null) {
      return res.status(404).json({ msg: "no such Fan exists!" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Fan.create({
      name: req.body.name,
    });
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});
router.post("/:fanId/animals/:animalId", async (req, res) => {
  try {
    const foundFan = await Fan.findByPk(req.params.fanId);
    if(!foundFan){
      return res.status(404).json({msg:"no such fan!"})
    }
    await foundFan.addAnimal(req.params.animalId);
    res.json({msg:"added you as fan!"})
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});
router.delete("/:fanId/animals/:animalId", async (req, res) => {
  try {
    const foundFan = await Fan.findByPk(req.params.fanId);
    if(!foundFan){
      return res.status(404).json({msg:"no such fan!"})
    }
    await foundFan.removeAnimal(req.params.animalId);
    res.json({msg:"removed you as fan!"})
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Fan.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (data === 0) {
      return res.status(404).json({ msg: "no such Fan exists!" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Fan.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (data[0] === 0) {
      return res.status(404).json({ msg: "no such tank exists!" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

module.exports = router;
