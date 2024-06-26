const express = require("express");
const router = express.Router();
const {Animal,Tank, Fan} = require("../models");

router.get("/", async (req, res) => {
  try {
    const data = await Animal.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Animal.findByPk(req.params.id,{
      include:[Tank,Fan]
    });
    if (data == null) {
      return res.status(404).json({ msg: "no such animal exists!" });
    }
    const fansNum = await data.countFans();
    data.numFans = fansNum;
    const planData = data.toJSON();
    planData.numFans = fansNum;
    res.json(planData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Animal.create({
      name: req.body.name,
      species: req.body.species,
      color: req.body.color,
      TankId:req.body.TankId
    });
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Animal.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (data === 0) {
      return res.status(404).json({ msg: "no such animal exists!" });
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error occurred", err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Animal.update(req.body, {
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
