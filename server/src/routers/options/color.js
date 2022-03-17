const express = require("express");
const { Color } = require("../../models/option/discriminators/color");
const router = new express.Router();

// Create
router.post("/colors", async (req, res) => {
  try {
    const color = new Color(req.body);
    await color.save();
    res.send(color);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Read
router.get("/colors", async (req, res) => {
  try {
    const colors = await Color.find();
    res.send(colors);
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
