const express = require("express");
const router = new express.Router();
const Accessories = require("../models/accessories");
const { upload } = require("../middleware/upload");

// Create
router.post(
  "/products/accessories",
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
      const accessories = new Accessories({
        ...req.body,
        profile: profile[0].buffer,
        images: bufferArray,
      });
      await accessories.save();
      res.send("accessories Added");
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
);

// Read
router.get("/products/accessories", async (req, res) => {
  try {
    const accessories = await Accessories.find({});
    res.send(accessories);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// Delete
router.delete("/products/accessories", async (req, res) => {
  try {
    await Accessories.deleteMany({});
    res.send("delete all accessories successfully");
  } catch (error) {}
});

module.exports = router;
