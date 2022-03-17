// express
const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");

// models
const { Product } = require("../../../models/product/product");
const Headphone = require("../../../models/product/discriminators/headphone");
const { Brand } = require("../../../models/brand");

// POST: create phone
router.post("/products/headphones", async (req, res) => {
  try {
    const headphone = new Headphone(req.body);

    if (!headphone) {
      throw new Error("Create headphone fails");
    }

    await headphone.save();
    res.send(headphone);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
