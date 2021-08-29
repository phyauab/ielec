const express = require("express");
const router = new express.Router();
const Phone = require("../models/phone");
const { upload } = require("../middleware/upload");

// CREATE
// Multiple calls on multer middleware is not allowed, use fields instead
// https://stackoverflow.com/questions/62846558/multererror-unexpected-field-when-i-need-to-upload-multiple-file-in-nodejs
router.post(
  "/products/phones",
  upload.fields([{ name: "profile" }, { name: "images" }]),
  async (req, res) => {
    let images = req.files.images;
    let profile = req.files.profile;
    let bufferArray = [];
    if (images) {
      for (let file of images) {
        bufferArray.push(file.buffer);
      }
    }
    try {
      const phone = new Phone({
        ...req.body,
        profile: profile[0].buffer,
        images: bufferArray,
      });
      await phone.save();
      res.send("Phone Added");
    } catch (error) {
      console.log("main error");
      res.status(400).send({ error: error.message });
    }
  },
  (error, req, res, next) => {
    console.log("upload error");
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
);

// READ
router.get("/products/phones", async (req, res) => {
  try {
    const data = await Phone.find({});
    res.set("Content-Type", "image/jpg");
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.get("/products/phones/properties", async (req, res) => {
  let properties = Phone.schema.paths;
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

router.get("/products/phones/properties", async (req, res) => {
  console.log(Phone.schema.paths);
  try {
    res.send(Phone.schema.paths);
  } catch (error) {}
});

// Delete
router.delete("/products/phones", async (req, res) => {
  try {
    await Phone.deleteMany({});
    res.send("delete all phones successfully");
  } catch (error) {}
});

module.exports = router;
