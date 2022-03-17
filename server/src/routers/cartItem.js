const express = require("express");
const router = new express.Router();
const { CartItem } = require("../models/cartItem");
const { Option } = require("../models/option/option");
const { Color } = require("../models/option/discriminators/color");
const auth = require("../middleware/auth");

// POST: add item
router.post("/cartItems", auth, async (req, res) => {
  try {
    const cartItem = new CartItem({
      ...req.body,
      user: req.user._id,
    });
    console.log(cartItem);
    await cartItem.save();
    res.send(cartItem);
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET: read items
router.get("/cartItems", auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("product");
    res.send(cartItems);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/cartItems/:id", auth, async (req, res) => {
  try {
    const cartItem = await CartItem.updateOne({ _id: req.params.id }, req.body);
    res.send(cartItem);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE: delete an item
router.delete("/cartItems/:id", auth, async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    res.send(cartItem);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
