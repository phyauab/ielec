// express
const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");

// models
const { Product } = require("../../../models/product/product");
const Laptop = require("../../../models/product/discriminators/laptop");
const { Brand } = require("../../../models/brand");

// POST: create phone
router.post("/products/laptops", async (req, res) => {
  try {
    const laptop = new Laptop(req.body);

    if (!laptop) {
      throw new Error("Create Laptop fails");
    }

    await laptop.save();
    res.send(laptop);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
