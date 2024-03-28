const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    try {
      const data = await User.findAll();
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const data = await User.findByPk(req.params.id);
      if (data == null) {
        return res.status(404).json({ msg: "no such User exists!" });
      }
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const data = await User.create({
        username:req.body.username,
        password:req.body.password
      });
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const foundUser = await User.findOne({
        where:{
          username:req.body.username
        }
      });
      if(!foundUser){
        return res.status(401).json({msg:"invalid username/password combo"})
      }
      if(!bcrypt.compareSync(req.body.password,foundUser.password)){
        return res.status(401).json({msg:"invalid username/password combo"})
      }
      return res.json(foundUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const data = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (data === 0) {
        return res.status(404).json({ msg: "no such User exists!" });
      }
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const data = await User.update(req.body, {
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
  