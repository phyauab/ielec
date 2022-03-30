const mongoose = require("mongoose");
// const { Product, options, productSchema } = require("./product");
const { Schema } = mongoose;
const { optionSchema } = require("../models/option/option");
const transactionSchema = new mongoose.Schema(
  {
    cartItems: {
      type: [Schema.Types.ObjectId],
      ref: "CartItem",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction };
