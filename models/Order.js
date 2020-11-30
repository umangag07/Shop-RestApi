const mongoose = require('mongoose')
const OrderSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Products'
    },
    quantity:{
          type:Number,
          default: 1
    }
})

module.exports = mongoose.model('Products', ProductSchema)