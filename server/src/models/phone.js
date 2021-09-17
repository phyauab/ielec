const mongoose = require("mongoose");
const { Product, options } = require("./product");
const { ramSchema } = require("./options/ram");
const { colorSchema } = require("./options/color");
const { storageSchema } = require("./options/storage");

const phoneSchema = new mongoose.Schema(
  {
    color: {
      type: [colorSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    ram: {
      type: [ramSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    storage: {
      type: [storageSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  options
);

const Phone = Product.discriminator("Phone", phoneSchema);

module.exports = Phone;
