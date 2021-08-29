const express = require("express");
const router = new express.Router();
const Headphone = require("../models/headphone");
const { upload } = require("../middleware/upload");

// Create
router.post(
  "/products/headphones",
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
      const headphone = new Headphone({
        ...req.body,
        profile: profile[0].buffer,
        images: bufferArray,
      });
      await headphone.save();
      res.send("headphone Added");
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
);

// Read
router.get("/products/headphones", async (req, res) => {
  try {
    const headphone = await Headphone.find({});
    res.send(headphone);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// Delete
router.delete("/products/headphones", async (req, res) => {
  try {
    await Headphone.deleteMany({});
    res.send("delete all headphones successfully");
  } catch (error) {}
});

module.exports = router;
