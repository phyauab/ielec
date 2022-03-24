// express
const express = require("express");
const router = new express.Router();
const auth = require("../../../middleware/auth");
const { upload } = require("../../../middleware/upload");

// models
const { Product } = require("../../../models/product/product");
const Phone = require("../../../models/product/discriminators/phone");
const { Brand } = require("../../../models/brand");

// IMGUR
// const { ImgurClient } = require("imgur");
const imgur_client_id = process.env.IMGUR_CLIENT_ID;
const imgur_access_token = process.env.IMGUR_ACCESS_TOKEN;
const imgur_refresh_token = process.env.IMGUR_REFRESH_TOKEN;

// POST: create phone
router.post(
  "/products/phones",
  auth,
  upload.fields([{ name: "profilePath" }, { name: "imagePaths" }]),
  async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        throw new Error("access denied");
      }

      const phone = new Phone(req.body);

      if (!phone) {
        throw new Error("Create phone fails");
      }

      await phone.save();
      res.send(phone);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

module.exports = router;
