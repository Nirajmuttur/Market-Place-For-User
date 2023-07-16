const express = require('express')
const userCtrl =require('./../controller/userController')

const router = express.Router()

router.route('/api/addUser').post(userCtrl.create)
router.route('/api/addAddress').post(userCtrl.addAdress)
router.route('/api/getAddress').get(userCtrl.getAddress)
router.route('/api/userdetails').get(userCtrl.getUserInfo)

module.exports = router