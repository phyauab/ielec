// express
const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");

// models
const { Product } = require("../../../models/product/product");
const Accessories = require("../../../models/product/discriminators/accessories");
const { Brand } = require("../../../models/brand");

// POST: create phone
router.post("/products/accessories", async (req, res) => {
  try {
    const accessories = new Accessories(req.body);

    if (!accessories) {
      throw new Error("Create accessories fails");
    }

    await accessories.save();
    res.send(accessories);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
