const express = require("express");
const router = new express.Router();
const { Product } = require("../models/product");
const { upload } = require("../middleware/upload");

router.get("/products", async (req, res) => {
  let params = {};
  if (Object.keys(req.query).length !== 0) {
    params = req.query;

    // conver string to boolean
    if (params.featured) {
      params.featured = params.featured === "true";
    }
  }
  console.log(params);
  try {
    const data = await Product.find(params);
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.get("/products/properties", async (req, res) => {
  let properties = Product.schema.paths;
  delete properties.updatedAt;
  delete properties.createdAt;
  delete properties.__t;
  delete properties.__v;
  delete properties.category;
  delete properties._id;

  let tempProperties = [];
  for (const property in properties) {
    const type = properties[property].instance;
    tempProperties.push({ property, type });
  }
  try {
    res.send({ properties: tempProperties });
  } catch (error) {
    res.status(400).send({ error: "fetch properties failed" });
  }
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
