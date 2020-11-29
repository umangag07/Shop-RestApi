const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
          type:Number,
          required:true
    }
})

module.exports = mongoose.model('Products', ProductSchema)