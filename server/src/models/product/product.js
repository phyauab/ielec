const mongoose = require("mongoose");
const options = { discriminatorKey: "category" };
const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      unique: false,
      required: true,
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
    profilePath: { type: String },
    imagePaths: {
      type: [String],
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

module.exports = { Product, options, productSchema };
