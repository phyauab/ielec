const express = require("express");
const router = new express.Router();
const Headphone = require("../models/headphone");
const { upload } = require("../middleware/upload");

// Create
router.post(
  "/products/headphones",
  upload.single("profile"),
  async (req, res) => {
    try {
      const headphone = new Headphone({
        ...req.body,
        profile: req.file.buffer,
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
