const mongoose = require("mongoose");

const storageSchema = new mongoose.Schema({
  storage: {
    type: Number,
    require: true,
  },
  unit: {
    type: String,
    required: true,
    enum: ["KB", "MB", "GB", "TB"],
  },
  additionalPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = { storageSchema };
