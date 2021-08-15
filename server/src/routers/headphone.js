const express = require("express");
const router = new express.Router();
const Headphone = require("../models/headphone");

// Create
router.post("/products/headphones", async (req, res) => {
  try {
    const headphone = new Headphone({
      brand: "Sony",
      name: "Mx1000",
      qty: 5,
      price: 4333,
      anc: true,
    });

    await headphone.save();
    res.send("headphone added");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// Read
router.get("/products/headphones", async (req, res) => {
  try {
    const headphone = await Headphone.find({});
    res.send(headphone);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;
