const mongoose = require("mongoose");

const options = { discriminatorKey: "category" };

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      default: "",
    },
    profile: { type: Buffer },
    images: {
      type: [Buffer],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
  options
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, options };
