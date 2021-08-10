const express = require("express");
const router = new express.Router();
const User = require("../models/user");

// Sign up new user
router.post("/users/signup", async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save();

    const token = await user.generateToken();

    res.status(201).send({user, token});
  } catch(e) {
    console.log(e);
    res.status(400).send();
  }
});

// Login existing user
router.post("/users/login", async (req, res) => {
  console.log(req.body);
  res.send();
});

// READ
router.get("/users/me", async (req, res) => {
  console.log(req.body.username)
  res.send("WTF");
});

module.exports = router;
