const mongoose = require("mongoose");
const { Product, options } = require("./product");

const accessoriesSchema = new mongoose.Schema({

}, options)

const Accessories = new Product.discriminator('Phone', accessoriesSchema);

module.exports = Accessories;