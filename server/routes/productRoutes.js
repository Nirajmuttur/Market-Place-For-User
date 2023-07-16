const express = require('express')
const productCtrl =require('./../controller/productController')

const router = express.Router()

router.route('/api/productlist').get(productCtrl.productList)
router.route('/api/productDetail/:id').get(productCtrl.productById)
router.route('/api/productByCategory/:id').get(productCtrl.productByCategory)

module.exports = router