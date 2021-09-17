const express = require("express");
const router = new express.Router();
const { Product } = require("../models/product");
const { upload } = require("../middleware/upload");
const Phone = require("../models/phone");
const Laptop = require("../models/laptop");
const Headphone = require("../models/headphone");
const Accessories = require("../models/accessories");
const { getProperties } = require("../helper");

// Create
// Create - a product
router.post(
  "/products",
  upload.fields([{ name: "profile" }, { name: "images" }]),
  async (req, res) => {
    // replace type as __t
    let params = req.body;
    params.__t = params.type;
    delete params.type;

    // get images from files to params
    let images = req.files.images;
    let profile = req.files.profile;
    let bufferArray = [];
    if (images) {
      for (let file of images) {
        bufferArray.push(file.buffer);
      }
    }
    params.profile = profile[0].buffer;
    params.images = bufferArray;

    console.log(params);
    // create a product
    let product;
    switch (params.__t) {
      case "Phone":
        product = new Phone(params);
        break;
      case "Laptop":
        product = new Laptop(params);
        break;
      case "Headphone":
        product = new Headphone(params);
        break;
      case "Accessories":
        product = new Accessories(params);
        break;
      default:
        break;
    }

    // save the product
    try {
      await product.save();
      res.send(`${params.__t} added`);
    } catch (e) {
      res.send("Add product error");
    }
  }
);

// Read
router.get("/products", async (req, res) => {
  let params = {};
  if (Object.keys(req.query).length !== 0) {
    params = req.query;
    // convert string to boolean
    if (params.featured) {
      params.featured = params.featured === "true";
    }
    // convert type to __t
    if (params.type) {
      params.__t = params.type;
      delete params.type;
    }
  }

  try {
    const data = await Product.find(params);
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.get("/products/exist", async (req, res) => {
  try {
    console.log("hi");
    // let list = await Phone.find({}, { storage: 1 });
    let list = await Phone.distinct("name");
    res.send(list);
  } catch (e) {}
});

router.get("/products/properties", async (req, res) => {
  const __t = req.query.type;
  let properties;

  switch (__t) {
    case "Phone":
      properties = Phone.schema.paths;
      break;
    case "Laptop":
      properties = Laptop.schema.paths;
      break;
    case "Headphone":
      properties = Headphone.schema.paths;
      break;
    case "Accessories":
      properties = Accessories.schema.paths;
      break;
    default:
      res.status(404).send("No such category");
      break;
  }

  delete properties.updatedAt;
  delete properties.createdAt;
  delete properties.__t;
  delete properties.__v;
  delete properties.category;
  delete properties._id;
  let tempProperties = getProperties(properties);

  try {
    res.send(tempProperties);
  } catch (error) {
    res.status(400).send({ error: "fetch properties failed" });
  }
});

router.get("/products/categories", async (req, res) => {
  console.log(Object.keys(Product.discriminators));
  try {
    res.send(Object.keys(Product.discriminators));
  } catch (error) {
    res.status(404).send("Cannot find product categories");
  }
});

// Delete
// Delete - all products
router.delete("/products", async (req, res) => {
  try {
    await Product.deleteMany({});
    res.send("delete all products successfully");
  } catch (error) {}
});

// Delete - product by id
router.delete("/products/:id", async (req, res) => {
  console.log(req.params);
  try {
    await Product.findOneAndDelete(req.params);
    res.send("product deleted");
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
