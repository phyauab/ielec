const mongoose = require("mongoose");
const { Product, options } = require("./product");

const phoneSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    ram: {
      type: Number,
      required: true,
    },
    storage: {
      type: Number,
      required: true,
    },
  },
  options
);

const Phone = Product.discriminator("Phone", phoneSchema);

module.exports = Phone;
