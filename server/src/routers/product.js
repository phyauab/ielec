const express = require("express");
const router = new express.Router();
const { Product } = require("../models/product");

router.get("/products", async (req, res) => {
  try {
    console.log("SASD");
    const data = await Product.find({});
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;
