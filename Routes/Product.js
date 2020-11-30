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
          res.status(200).send({
            _id:result._id,  
            name:result.name,
            price:result.price,
            request:{
                type:'GET',
                url:'http://localhost:3000/products/'+ result._id
            }
          })
      })
      .catch(err=>{
          res.send({message:err})
      })
    
})

router.get('/:productId',(req, res)=>{
    const id = req.params.productId;
    Product.findById(id)
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send({message:err})
    })
  
})

router.patch('/:productId',(req, res)=>{
    const id = req.params.productId;
    const update = {}
    for (const ops of req.body){
        update[ops.propName] = ops.value;
    }
    Product.update({_id:id},{$set:update})
    .exec()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
        
    
})

router.delete('/:productId',(req, res)=>{
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
    
})

module.exports = router