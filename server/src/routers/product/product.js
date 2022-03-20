const express = require("express");
const router = new express.Router();
const { Product } = require("../../models/product/product");
const { upload } = require("../../middleware/upload");
const { Brand } = require("../../models/brand");
// const { Option } = require("../models/option/option");
const { getProperties } = require("../../helper");
const queryString = require("query-string");

// const {Phone}

// Create
// Create - a product
router.post(
  "/products",
  upload.fields([{ name: "profile" }, { name: "images" }]),
  async (req, res) => {
    try {
      // images
      // let profile = null;
      // let bufferArray = null;
      // if (req.files) {
      //   let images = req.files.images;
      //   profile = req.files.profile;
      //   let bufferArray = [];
      //   if (images) {
      //     for (let file of images) {
      //       bufferArray.push(file.buffer);
      //     }
      //   }
      // }

      // const phone =

      let product;

      // save the product
      await product.save();

      res.send(product);
    } catch (e) {
      res.send(e.message);
    }
  }
);

// Read
router.get("/products", async (req, res) => {
  console.log(req.query);
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
  console.log(filter);

  try {
    const data = await Product.find(filter).populate("brand");
    // console.log(data);
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.get("/products/featured", async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    res.send(products);
  } catch (e) {}
});

// POST: with filter
router.post("/products/filter", async (req, res) => {
  // let params = {};
  // if (Object.keys(req.query).length !== 0) {
  //   params = req.query;
  //   // convert string to boolean
  //   if (params.featured) {
  //     params.featured = params.featured === "true";
  //   }
  //   // convert type to __t
  //   if (params.type) {
  //     params.__t = params.type;
  //     delete params.type;
  //   }
  // }
  // // console.log(params.brand);
  console.log(req.body);

  try {
    const data = await Product.find(req.body).populate("brand");
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// GET: Single Product
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("brand");
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
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
  console.log(Object.keys(Product.discriminators));
  try {
    res.send(Object.keys(Product.discriminators));
  } catch (error) {
    res.status(404).send("Cannot find product categories");
  }
});

// Update
// Update - a product
router.patch(
  "/products/:id",
  upload.fields([{ name: "profile" }, { name: "images" }]),
  async (req, res) => {
    const { id } = req.params;
    try {
      let images = null;
      let profile = null;

      if (req.files) {
        if (req.files.images) {
          images = req.files.images;
        }
        if (req.files.profile) {
          profile = req.files.profile;
          req.body.profile = profile[0].buffer;
        }
      }
      let bufferArray = [];
      if (images) {
        for (let file of images) {
          bufferArray.push(file.buffer);
        }
        req.body.images = bufferArray;
      }

      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      res.send(product);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

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
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send(product);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
