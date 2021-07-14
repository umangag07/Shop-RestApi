const Product = require('../models/Product')

exports.get_all_product = async (req, res) => {
    try {
        console.log("hello")
        const products = await Product.find()
        
        console.log(products)
        res.send(products)
    } catch (err) {
        res.send({ message: err, m:"not working" })
    }
}
exports.get_single_product = (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send({ message: err })
        })

}

exports.create_product = async (req, res) => {
    console.log(req.file)
    
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save()
        .then(result => {
            res.status(200).send({
                _id: result._id,
                name: result.name,
                price: result.price,
                productImage: result.productImage,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            })
        })
        .catch(err => {
            res.send({ message: err })
        })

}
exports.patch_product_details = (req, res) => {
    const id = req.params.productId;
    const update = {}
    for (const ops of req.body) {
        update[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: update })
        .exec()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
}

exports.delete_product = (req, res) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })

}