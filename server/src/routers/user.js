const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

// Sign up new user
router.post("/users/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = await user.generateToken();

    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: error.message });
  }
});

// Login existing user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByPassword(
      req.body.data.username,
      req.body.data.password
    );
    // When the user is logged in, a token is generated
    const token = await user.generateToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Logout existing user
router.post("/users/logout", auth, async (req, res) => {
  try {
    // remove token
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Relogin
router.post("/users/relogin", auth, async (req, res) => {
  try {
    const { user, token } = req;
    res.send({ user, token });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

// READ
router.get("/users/me", async (req, res) => {
  console.log(req.body.username);
  res.send("WTF");
});

module.exports = router;
