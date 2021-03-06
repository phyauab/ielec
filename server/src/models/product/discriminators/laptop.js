const mongoose = require("mongoose");
const { Product, options } = require("../product");
const { ramSchema } = require("../../option/discriminators/ram");
const { colorSchema } = require("../../option/discriminators/color");
const { storageSchema } = require("../../option/discriminators/storage");

const laptopSchema = new mongoose.Schema(
  {
    cpu: {
      type: String,
      required: true,
    },
    ram: {
      type: [ramSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    hdd: {
      type: [storageSchema],
    },
    ssd: {
      type: [storageSchema],
    },
    color: {
      type: [colorSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  options
);

const Laptop = Product.discriminator("Laptop", laptopSchema);

module.exports = Laptop;
