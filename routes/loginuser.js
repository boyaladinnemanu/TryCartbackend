const express = require('express')
const {LoginUser} = require('../controller/loginuser')
const router = express.Router()

router.route('/').post(LoginUser)

module.exports = router