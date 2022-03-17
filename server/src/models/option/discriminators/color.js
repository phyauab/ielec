const mongoose = require("mongoose");
const { Option } = require("../option");

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  colorCode: {
    type: String,
    required: true,
  },
});

const Color = Option.discriminator("Color", colorSchema);

module.exports = { Color, colorSchema };
