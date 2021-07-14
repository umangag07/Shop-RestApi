const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const ProductController = require('../controllers/product')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }

})
const filefilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: filefilter });

router.get('/', ProductController.get_all_product);

router.post('/', checkAuth, upload.single('productimage'), ProductController.create_product)

router.get('/:productId', ProductController.get_single_product)

router.patch('/:productId', checkAuth, ProductController.patch_product_details)

router.delete('/:productId', checkAuth, ProductController.delete_product)

module.exports = router