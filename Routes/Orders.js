const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Product = require('../models/Product')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')
const OrderController = require('../controllers/order')

router.get('/', OrderController.get_all_order)

router.post('/', checkAuth, OrderController.post_order)

router.get('/:orderId', OrderController.get_single_order)

router.patch('/:orderId', checkAuth, OrderController.patch_order)

router.delete('/:orderId', checkAuth, OrderController.delete_order)

module.exports = router