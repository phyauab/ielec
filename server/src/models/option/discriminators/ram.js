const mongoose = require("mongoose");
const { Option } = require("../option");

const ramSchema = new mongoose.Schema({
  size: {
    type: Number,
    require: true,
  },
  unit: {
    type: String,
    required: true,
    enum: ["MB", "GB"],
  },
});

const Ram = Option.discriminator("Ram", ramSchema);

module.exports = { Ram, ramSchema };
