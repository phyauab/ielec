const express = require("express");
const router = new express.Router();
const Accessories = require("../models/accessories");
const { upload } = require("../middleware/upload");

// Create
router.post(
  "/products/accessories",
  upload.single("profile"),
  async (req, res) => {
    try {
      const accessories = new Accessories({
        ...req.body,
        profile: req.file.buffer,
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
