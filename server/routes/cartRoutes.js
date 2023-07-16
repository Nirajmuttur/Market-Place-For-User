const express = require('express')
const cartCtrl =require('./../controller/cartController')

const router = express.Router()

router.route('/api/addcartitems').post(cartCtrl.create)
router.route('/api/increaseQuantity/:id').post(cartCtrl.increaseQuantity)
router.route('/api/decreaseQuantity/:id').post(cartCtrl.decreaseQuantity)
router.route('/api/removeCartItems/:id').post(cartCtrl.removeCartItem)

module.exports = router