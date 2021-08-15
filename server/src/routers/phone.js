const express = require("express");
const router = new express.Router();
const Phone = require("../models/phone");

// CREATE
router.post("/products/phones", async (req, res) => {
  try {
    const phone = new Phone({
      brand: "Apple",
      name: "iphone",
      qty: 10,
      price: 100,
      color: "White",
      ram: 1,
      storage: 64,
    });
    await phone.save();
    res.send("Phone Added");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// READ
router.get("/products/phones", async (req, res) => {
  try {
    const data = await Phone.find({});
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;
