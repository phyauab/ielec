const mongoose = require("mongoose");

const options = { discriminatorKey: 'type' }

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    rating: {
        type: Number
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        default: ''
    },
    images: {

    }
}, options)

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, options }