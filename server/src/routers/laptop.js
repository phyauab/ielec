const express = require("express");
const router = new express.Router();
const Laptop = require("../models/laptop");
const { upload } = require("../middleware/upload");

// Create
router.post(
  "/products/laptops",
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
      const laptop = new Laptop({
        ...req.body,
        profile: profile[0].buffer,
        images: bufferArray,
      });
      await laptop.save();
      res.send("laptop Added");
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
);

// Read
router.get("/products/laptops", async (req, res) => {
  try {
    const laptops = await Laptop.find({});
    res.send(laptops);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// Delete
router.delete("/products/laptops", async (req, res) => {
  try {
    await Laptop.deleteMany({});
    res.send("delete successfully");
  } catch (error) {}
});

module.exports = router;
