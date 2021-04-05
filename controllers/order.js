const Order = require('../models/Order')
const Product = require('../models/Product')
const mongoose = require('mongoose')

exports.get_all_order = async (req, res) => {
    try {
        const orders = await Order.find()
        res.send(orders)
    } catch (err) {
        res.send({ message: err })
    }
}
exports.post_order = (req, res) => {
    Product.findById(req.body.productId)
        .then(product => {
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity,
                productUrl: "https://shop-restapi.herokuapp.com/" + req.body.productId

            })
            order.save()
                .then(result => {
                    console.log(result)
                    res.send(result)
                })
                .catch(err => {
                    res.send({ message: err })
                })
        })
        .catch(err => {
            res.status(500).json({
                message: 'product not found',
                error: err
            })
        })

}
exports.get_single_order = (req, res) => {
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .then(result => {
            if (!result) {
                res.status(404).json({ message: "product not found" })
            }
            else {
                res.send(result)
            }

        })
        .catch(err => {
            res.send(err)
        })

}
exports.patch_order = (req, res) => {
    const id = req.params.orderId;
    const orderPatch = {}
    console.log(req.body)
    for (const ord of req.body) {
        orderPatch[ord.propName] = ord.value
    }
    Order.updateOne({ _id: id }, { $set: orderPatch })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })


}
exports.delete_order = (req, res) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })

}