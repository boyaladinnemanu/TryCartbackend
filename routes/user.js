const express = require('express')
const {handelallusers,handelGetusersbyid,handelPutuserbyid,handelDeleteuserbyid,handelCreateuser} = require('../controller/user')
const router = express.Router()

router.route('/').get(handelallusers).post(handelCreateuser)

router
.route('/:id')
.get(handelGetusersbyid)
.patch(handelPutuserbyid)
.delete(handelDeleteuserbyid)

module.exports = router