const mongoose = require("mongoose");

const ramSchema = new mongoose.Schema({
  ram: {
    type: Number,
    require: true,
  },
  unit: {
    type: String,
    required: true,
    enum: ["MB", "GB"],
  },
  additionalPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = { ramSchema };
