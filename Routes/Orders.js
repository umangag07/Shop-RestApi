const express = require('express')
const router = express.Router()

router.get('/',(req ,res)=>{
    res.send("Orders page")
})

router.post('/',(req, res)=>{
    const order={
        productId:req.body.productId,
        quantity:req.body.quantity
    }
    res.status(200).json({order:order })
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