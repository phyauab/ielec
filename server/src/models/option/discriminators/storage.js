const mongoose = require("mongoose");
const { Option } = require("../option");

const storageSchema = new mongoose.Schema({
  size: {
    type: Number,
    require: true,
  },
  unit: {
    type: String,
    required: true,
    enum: ["KB", "MB", "GB", "TB"],
  },
});

const Storage = Option.discriminator("Storage", storageSchema);

module.exports = { Storage, storageSchema };
