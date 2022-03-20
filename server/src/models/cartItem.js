const mongoose = require("mongoose");
// const { Product, options, productSchema } = require("./product");
const { Schema } = mongoose;
const { optionSchema } = require("../models/option/option");
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    options: [{}],
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = { CartItem };
