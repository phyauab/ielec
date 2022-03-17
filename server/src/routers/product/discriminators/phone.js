// express
const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");

// models
const { Product } = require("../../../models/product/product");
const Phone = require("../../../models/product/discriminators/phone");
const { Brand } = require("../../../models/brand");

// POST: create phone
router.post("/products/phones", async (req, res) => {
  try {
    const phone = new Phone(req.body);

    if (!phone) {
      throw new Error("Create phone fails");
    }

    await phone.save();
    res.send(phone);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
