const express = require("express");
const router = new express.Router();
const { User } = require("../models/user");
const auth = require("../middleware/auth");

// READ
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.send(e.message);
  }
});

// Sign up new user
router.post("/users/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = await user.generateToken();

    res.status(201).send({ user, access_token: token });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: error.message });
  }
});

// Login existing user
router.post("/users/login", async (req, res) => {
  try {
    const isValidated = await User.findByPassword(
      req.body.username,
      req.body.password
    );

    if (!isValidated) {
      throw new Error("Invalid username or password");
    }

    const user = await User.findOne(
      { username: req.body.username },
      "username email isAdmin"
    );

    // When the user is logged in, a token is generated
    const token = await user.generateToken();
    res.status(200).send({ user, access_token: token });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// Logout existing user
router.post("/users/logout", auth, async (req, res) => {
  try {
    // remove token
    // req.user.tokens = req.user.tokens.filter(
    //   (token) => token.token !== req.token
    // );
    // await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// refresh
router.get("/users/refresh", auth, async (req, res) => {
  try {
    const token = await req.user.generateRefreshToken();
    res.send({ user: req.user, refresh_token: token });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

// me
router.get("/users/me", auth, async (req, res) => {
  try {
    // const token = await req.user.generateRefreshToken();
    res.send(req.user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = router;
