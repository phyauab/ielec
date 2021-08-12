const mongoose = require("mongoose");
const { Product, options } = require("./product");

const laptopSchema = new mongoose.Schema({
    cpu: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    hdd: {
        type: Number,
    },
    ssd: {
        type: Number
    }
}, options)

const Laptop = Product.discriminator('Laptop', laptopSchema);

module.exports = Laptop;