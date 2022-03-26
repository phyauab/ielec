const express = require("express");
const router = new express.Router();
const auth = require("../../middleware/auth");
const { Product } = require("../../models/product/product");
const Phone = require("../../models/product/discriminators/phone");
const Laptop = require("../../models/product/discriminators/laptop");
const Headphone = require("../../models/product/discriminators/headphone");
const Accessories = require("../../models/product/discriminators/accessories");
const { upload } = require("../../middleware/upload");
const { Brand } = require("../../models/brand");
const { toBase64 } = require("../../helper");
// const { Option } = require("../models/option/option");
const { getProperties } = require("../../helper");

// Create
// Create - a product
router.post(
  "/products",
  auth,
  // upload.fields([{ name: "profilePath" }, { name: "imagePaths" }]),
  async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        throw new Error("access denied");
      }
      // create by category
      let category = req.body.category;
      delete req.body.category;
      let product;
      switch (category) {
        case "Phone":
          product = new Phone(req.body);
          break;
        case "Laptop":
          product = new Laptop(req.body);
          break;
        case "Headphone":
          product = new Headphone(req.body);
          break;
        case "Accessories":
          product = new Accessories(req.body);
          break;
        default:
          throw new Error("Category required");
      }

      console.log(product);

      // save the product
      await product.save();
      res.send(product);
    } catch (e) {
      console.log(e);
      res.send(e.message);
    }
  }
);

// Read
router.get("/products", async (req, res) => {
  let filter = {};

  // brand
  if (req.query.brand) {
    filter.brand = req.query.brand;
  }

  // rating
  if (req.query.minRating) {
    filter.rating = { $gte: req.query.minRating };
  }
  if (req.query.maxRating) {
    filter.rating = { ...filter.rating, $lte: req.query.maxRating };
  }
  if (req.query.minPrice) {
    filter.price = { $gte: req.query.minPrice };
  }
  if (req.query.maxPrice) {
    filter.price = { ...filter.price, $lte: req.query.maxPrice };
  }
  if (req.query.featured) {
    filter.featured = req.query.featured == "true";
  }

  try {
    const data = await Product.find(filter).populate("brand");
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.post("/products/duplicate", async (req, res) => {
  try {
    const duplicate = await Product.findOne({ name: req.body.name });
    if (duplicate) {
      throw new Error("Product with this name already exists");
    }

    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/products/featured", async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    res.send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET: Single Product
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("brand");
    res.send(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Read - get all unqiue value of a key
router.get("/products/unqiue_values", async (req, res) => {
  const { category, property } = req.query;

  let list = [];
  try {
    switch (category) {
      case "Phone":
        list = await Phone.distinct(property);
        break;
      case "Laptop":
        list = await Laptop.distinct(property);
        break;
      case "Headphone":
        list = await Headphone.distinct(property);
        break;
      case "Accessories":
        list = await Accessories.distinct(property);
        break;
    }
    res.send(list);
  } catch (e) {
    res.send(e.message);
  }
});

// Read - get properties of a category
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

// Read - get all categories, e.g. phone, laptop
router.get("/products/categories", async (req, res) => {
  try {
    res.send(Object.keys(Product.discriminators));
  } catch (error) {
    res.status(404).send("Cannot find product categories");
  }
});

router.patch("/products", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }

    let product;
    switch (req.body.__t) {
      case "Phone":
        product = await Phone.findOneAndUpdate(
          { _id: req.body._id },
          { $set: req.body },
          { useFindAndModify: false }
        );
        break;
      case "Laptop":
        product = await Laptop.findOneAndUpdate(
          { _id: req.body._id },
          { $set: req.body },
          { useFindAndModify: false }
        );
        break;
      case "Headphone":
        product = await Headphone.findOneAndUpdate(
          { _id: req.body._id },
          { $set: req.body },
          { useFindAndModify: false }
        );
        break;
      case "Accessories":
        product = await Accessories.findOneAndUpdate(
          { _id: req.body._id },
          { $set: req.body },
          { useFindAndModify: false }
        );
        break;
      default:
        throw new Error("Wrong category");
    }

    product = await Product.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { useFindAndModify: false }
    );

    res.send(product);
  } catch (e) {
    console.log(e);
    res.status.send(e.message);
  }
});

// DELETE: all products
router.delete("/products", async (req, res) => {
  try {
    await Product.deleteMany({});
    res.send("delete all products successfully");
  } catch (error) {}
});

// DELETE: a product
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send(product);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
