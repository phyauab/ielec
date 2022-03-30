const mongoose = require("mongoose");
const { Product, options } = require("../product");
const { ramSchema } = require("../../option/discriminators/ram");
const { colorSchema } = require("../../option/discriminators/color");
const { storageSchema } = require("../../option/discriminators/storage");

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
