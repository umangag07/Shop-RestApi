const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const mongoose = require('mongoose')

router.get('/',async (req ,res)=>{
    try{
        const orders = await Order.find()
        res.send(orders)
    }catch(err){
        res.send({message:err})
    }
})

router.post('/',(req, res)=>{
    const order= new Order({
      _id: mongoose.Types.ObjectId(),
      product: req.body.productId,
      quantity:req.body.quantity,
      productUrl:"http://localhost:3000/products/"+req.body.productId

    })
    order.save()
    .then(result=>{
        console.log(result)
        res.send(result)
    })
    .catch(err=>{
        res.send({message:err})
    })
    
})

router.get('/:orderId',(req, res)=>{
    const id = req.params.orderId;
    if(id === 'special'){
        res.send({message:"Your id is correct",id:id},
        )
    }else{
        res.send({message:"Your id is Incorrect"})
    }
})

router.patch('/:orderId',(req, res)=>{
    const id = req.params.orderId;
    
        res.send({message:"updated order",id:id})
    
})

router.delete('/:orderId',(req, res)=>{
    const id = req.params.orderId;
    res.send({message:"Deleted order",id:id})
    
})

module.exports = router