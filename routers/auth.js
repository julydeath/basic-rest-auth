const route = require("express").Router();
const userAuth = require("../model/User.js");
const bcrypt = require("bcrypt");

route.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const isUser = await userAuth.findOne({ email: req.body.email });
    if (!isUser) {
      const newUser = new userAuth({
        email: req.body.email,
        phone: req.body.phone,
        password: await bcrypt.hash(req.body.password, salt),
      });
      await newUser.save();
      res.status(200).json("user registered succussfully");
    } else {
      res.status(409).json("user already registered");
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/login", async (req, res) => {
  try {
    const isUser = await userAuth.findOne({ email: req.body.email });
    if (isUser) {
      if (await bcrypt.compare(req.body.password, isUser.password)) {
        res.status(200).json("login success");
      } else {
        res.status(409).json("wrong password");
      }
    } else {
      res.status(409).json("user not found");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
