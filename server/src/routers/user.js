const express = require("express");
const router = new express.Router();
const User = require("../models/user");

// CREATE
router.post("/users", async (req, res) => {
  console.log(req.body);
  res.send();
});

// READ
router.get("/users", async (req, res) => {
  res.send("WTF");
});

module.exports = router;
