const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const ProductController = require('../controllers/product')
const Aws = require('aws-sdk')
const uuid = require("uuid/v5")
const Product = require('../models/Product')
require("dotenv/config")

// const storage = multer.diskStorage({
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
    // filename: function (req, file, cb) {
    //     cb(null, file.originalname)
    // }

})
// const filefilter = (req, file, cb) => {

//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }
const upload = multer({ storage: storage });

const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET
})

router.get('/', ProductController.get_all_product);

router.post('/', checkAuth, upload.single('productimage'), async (req, res) => {
    console.log(req.file)
    const params = {
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:req.file.originalname,
        Body:req.file.buffer,
        ACL:"public-read-write",
        ContentType:"image/jpeg"
        
    };
    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error})
        }
        console.log(data)
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            productImage: data.Location
        });
        product.save()
            .then(result => {
                res.status(200).send({
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    productImage: data.Location,
                    // request: {
                    //     type: 'GET',
                    //      url: 'http://localhost:3000/products/' + result._id,
                    // }
                })
            })
            .catch(err => {
                res.send({ message: err })
            })
    })
    

})

router.get('/:productId', ProductController.get_single_product)

router.patch('/:productId', checkAuth, ProductController.patch_product_details)

router.delete('/:productId', checkAuth, ProductController.delete_product)

module.exports = router