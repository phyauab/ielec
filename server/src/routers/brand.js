const express = require("express");
const { Brand } = require("../models/brand");
const router = new express.Router();
const auth = require("../middleware/auth");

// Create
router.post("/brands", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }
    const brand = new Brand(req.body);
    await brand.save();
    res.send(`Brand ${brand.name} is added`);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Read
router.get("/brands", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.send(brands);
  } catch (e) {
    res.send(e.message);
  }
});

// GET: a brand
router.get("/brands/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.send(brand);
  } catch (e) {
    res.send(e.message);
  }
});

// Update
router.patch("/brands", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }
    const brand = await Brand.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { useFindAndModify: false }
    );
    // console.log(brand);
    if (brand.nModified > 0) res.send("Update brand successfully");
    else throw { message: "Update brand failed" };
  } catch (e) {
    res.send(e.message);
  }
});

// DELETE: ALL BRANDS
router.delete("/brands", auth, async (req, res) => {
  const { name } = req.query;
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }
    await Brand.deleteMany();
    res.send("brand deleted successfully");
  } catch (e) {
    res.send(e.message);
  }
});

// Delete
router.delete("/brands/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error("Access denied");
    }
    await Brand.findByIdAndDelete(req.params.id);
    res.send("brand deleted successfully");
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
});

module.exports = router;
