const mongoose = require("mongoose");
const { Product, options } = require("./product");

const phoneSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    ram: {
        type: Number,
        require: true
    },
    storage: {
        tpye: Number,
        required: true,
    }
}, options)

const Phone = new Product.discriminator('Phone', phoneSchema);

module.exports = Phone;