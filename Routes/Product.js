const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.get('/', async(req ,res)=>{
    try{
        const products = await Product.find()
        res.send(products)
    }catch(err){
        res.send({message:err})
    }
})

router.post('/', async (req, res)=>{
    console.log(req.body)
    const product= new Product({
        name: req.body.name,
        price: req.body.price
    });
    product.save()
      .then(result=>{
          res.send(result)
      })
      .catch(err=>{
          res.send({message:err})
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