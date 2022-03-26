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
    await cartItem.save();
    res.send(cartItem);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// GET: read items
router.get("/cartItems", auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({
      isPaid: false,
      user: req.user.id,
    }).populate({
      path: "product",
      model: "Product",
      populate: {
        path: "brand",
        model: "Brand",
      },
    });

    res.send(cartItems);
  } catch (e) {
    console.log(e);
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

// DELETE: delte all items
router.delete("/cartItems", auth, async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndDelete({ user: req.user._id });
    res.send(cartItem);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE: delete an item
router.delete("/cartItems/:id", auth, async (req, res) => {
  try {
    const cartItem = await CartItem.deleteOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (cartItem.deletedCount === 0) {
      throw new Error("Delete Item Fails");
    }

    res.send(cartItem);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

module.exports = router;
