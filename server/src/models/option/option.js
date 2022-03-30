const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  additionalPrice: {
    type: Number,
    default: 0,
  },
});

const Option = mongoose.model("Option", optionSchema);

module.exports = { Option, optionSchema };
