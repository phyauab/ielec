const express = require("express");
const router = new express.Router();
const Accessories = require("../models/accessories");

// Create
router.post("/products/accessories", async (req, res) => {
  try {
    const accessories = new Accessories({
      brand: "Samsung",
      name: "45W Fast Charger",
      qty: 100,
      price: 250,
    });

    await accessories.save();
    res.send("accessories added");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// Read
router.get("/products/accessories", async (req, res) => {
  try {
    const accessories = await Accessories.find({});
    res.send(accessories);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;
