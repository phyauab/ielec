const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  colorCode: {
    type: String,
    required: true,
  },
  additionalPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = { colorSchema };
