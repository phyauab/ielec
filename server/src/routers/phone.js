const express = require("express");
const router = new express.Router();
const Phone = require("../models/phone");
const { upload } = require("../middleware/upload");

// CREATE
router.post(
  "/products/phones",
  upload.single("profile"),
  async (req, res) => {
    console.log("phone");
    console.log(req.body);
    console.log(req.file);
    try {
      const phone = new Phone({ ...req.body, profile: req.file.buffer });
      await phone.save();
      res.send("Phone Added");
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  (error, req, res, next) => {
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
