const express = require("express");
const router = express.Router();
const Tank = require("../models/Tank");

router.get("/", (req, res) => {
  Tank.findAll().then((data) => {
    res.json(data);
  });
});
router.get("/salties", (req, res) => {
  Tank.findAll({
    where: {
      isSalt: true,
    },
  }).then((data) => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  Tank.findByPk(req.params.id).then((data) => {
    res.json(data);
  });
});

router.post("/", (req, res) => {
  Tank.create(req.body).then((data) => {
    res.json(data);
  });
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
  })
});

router.delete("/:id", (req, res) => {
  Tank.destroy({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    res.json(data);
  });
});

router.put("/:id", (req, res) => {
  Tank.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    res.json(data);
  });
});

module.exports = router;
