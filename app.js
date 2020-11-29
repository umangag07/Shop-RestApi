const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
const ProductRoute = require('./Routes/Product');
app.use('/products',ProductRoute)
const OrderRoute = require('./Routes/Orders');
app.use('/orders',OrderRoute)

app.use((req,res,next)=>{
    res.status(200).json({
        message: "It works"
    });
})



module.exports = app;