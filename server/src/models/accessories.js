const mongoose = require("mongoose");
const { Product, options } = require("./product");

const accessoriesSchema = new mongoose.Schema({}, options);

const Accessories = Product.discriminator("Accessories", accessoriesSchema);

module.exports = Accessories;
