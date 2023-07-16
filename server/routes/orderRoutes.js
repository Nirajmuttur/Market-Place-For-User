const express = require('express')
const orderCtrl =require('./../controller/orderController')

const router = express.Router()

router.route("/api/order").post(orderCtrl.create)
router.route("/api/orderData").post(orderCtrl.order)
module.exports = router