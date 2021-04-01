const mongoose = require('mongoose')
const OrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    productUrl: {
        type: String
    }
})

module.exports = mongoose.model('Orders', OrderSchema)