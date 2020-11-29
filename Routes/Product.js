const express = require('express')
const router = express.Router()

router.get('/',(req ,res)=>{
    res.send("Products page")
})

router.post('/',(req, res)=>{
    const product={
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        createdProduct:product
    })
})

router.get('/:productId',(req, res)=>{
    const id = req.params.productId;
    if(id === 'special'){
        res.send({message:"Your id is correct",id:id},
        )
    }else{
        res.send({message:"Your id is Incorrect"})
    }
})

router.patch('/:productId',(req, res)=>{
    const id = req.params.productId;
    
        res.send({message:"updated product",id:id})
    
})

router.delete('/:productId',(req, res)=>{
    const id = req.params.productId;
    res.send({message:"Deleted product",id:id})
    
})

module.exports = router