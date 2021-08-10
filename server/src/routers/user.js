const express = require("express");
const router = new express.Router();
const User = require("../models/user");

// Sign up / Login
router.post("/users/signup", async (req, res) => {
  console.log(req.body);
  res.send();
});

router.post("/users/login", async (req, res) => {
  console.log(req.body);
  res.send();
});

// READ
router.get("/users/login", async (req, res) => {
  console.log(req.body.username)
  res.send("WTF");
});

module.exports = router;
