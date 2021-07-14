const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    productImage: { type: String }
})

module.exports = mongoose.model('products', ProductSchema)