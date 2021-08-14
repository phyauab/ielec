const mongoose = require("mongoose");
const { Product, options } = require("./product");

const headphoneSchema = new mongoose.Schema(
  {
    anc: {
      type: Boolean,
      default: false,
    },
    wired: {
      type: Boolean,
      default: false,
    },
  },
  options
);

const Headphone = Product.discriminator("Headphone", headphoneSchema);

module.exports = Headphone;
