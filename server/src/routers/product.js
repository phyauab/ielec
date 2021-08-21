const express = require("express");
const router = new express.Router();
const { Product } = require("../models/product");
const { upload } = require("../middleware/upload");

router.get("/products", async (req, res) => {
  try {
    console.log("SASD");
    const data = await Product.find({});
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.get("/products/properties", async (req, res) => {
  console.log(Product.schema.paths);
  try {
    res.send(Product.schema.paths);
  } catch (error) {}
});

router.get("/products/categories", async (req, res) => {
  console.log(Object.keys(Product.discriminators));
  try {
    res.send(Object.keys(Product.discriminators));
  } catch (error) {}
});

// Delete
router.delete("/products", async (req, res) => {
  try {
    await Product.deleteMany({});
    res.send("delete all products successfully");
  } catch (error) {}
});

module.exports = router;
