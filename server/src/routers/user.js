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

// GET: me
router.get("/users/me", auth, async (req, res) => {
  try {
    // const token = await req.user.generateRefreshToken();
    res.send(req.user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

// GET: single user
router.get("/users/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }
    const user = await User.findById(req.params.id).select("-password");
    res.send(user);
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
    res.status(400).send({ error: e.message });
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
      "username email isAdmin firstName lastName gender email birthday"
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

router.patch("/users", auth, async (req, res) => {
  try {
    if (req.user.isAdmin || req.user._id === req.body._id) {
      const user = await User.findOneAndUpdate({ _id: req.body._id }, req.body);
      res.send(user);
    } else {
      throw new Error("Access Denied");
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// PATCH: update user info
router.patch("/users/update", auth, async (req, res) => {
  try {
    const { firstName, lastName, gender, email, birthday } = req.body;
    req.user.firstName = firstName;
    req.user.lastName = lastName;
    req.user.gender = gender;
    req.user.email = email;
    req.user.birthday = birthday;

    const newUser = await req.user.save();

    res.send(newUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.delete("/users/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }

    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

module.exports = router;
