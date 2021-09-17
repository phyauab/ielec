const express = require("express");
const { Brand } = require("../models/options/brand");
const router = new express.Router();

// Create
router.post("/brands", async (req, res) => {
  try {
    const brand = new Brand(req.query);
    await brand.save();
    res.send(`Brand ${brand.name} is added`);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Read
router.get("/brands", async (req, res) => {
  try {
    const brand = await Brand.find();
    res.send(brand);
  } catch (e) {
    res.send(e.message);
  }
});

// Update
router.patch("/brands/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const brand = await Brand.updateOne(
      { name },
      { $set: { name: req.query.name } }
    );
    console.log(brand);
    if (brand.nModified > 0) res.send("Update brand successfully");
    else throw { message: "Update brand failed" };
  } catch (e) {
    res.send(e.message);
  }
});

// Delete
router.delete("/brands", async (req, res) => {
  const { name } = req.query;
  try {
    await Brand.deleteOne({ name });
    res.send("brand deleted successfully");
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
