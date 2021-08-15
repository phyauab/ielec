const express = require("express");
const router = new express.Router();
const Laptop = require("../models/laptop");

// Create
router.post("/products/laptops", async (req, res) => {
  try {
    const laptop = new Laptop({
      brand: "Dell",
      name: "XPS13",
      qty: 20,
      price: 9999,
      cpu: "ryzen 3600",
      ram: 8,
      ssd: 128,
    });

    await laptop.save();
    res.send("laptop added");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// Read
router.get("/products/laptops", async (req, res) => {
  try {
    const laptops = await Laptop.find({});
    res.send(laptops);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;
