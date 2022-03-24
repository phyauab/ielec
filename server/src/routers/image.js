const express = require("express");
const router = new express.Router();
const ImageKit = require("imagekit");
const IMAGEKIK_ENDPOINT = process.env.IMAGEKIK_ENDPOINT;
const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

router.get("/image/auth", async (req, res) => {
  try {
    var imagekit = new ImageKit({
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: IMAGEKIK_ENDPOINT,
    });

    var authenticationParameters = imagekit.getAuthenticationParameters();

    res.send(authenticationParameters);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
