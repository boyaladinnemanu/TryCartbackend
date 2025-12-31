const express = require('express')

const {handelAuthenticateUser} = require("../middleware/authMiddleware")
const {handelCreateRegisterUser,
    handelAllRegisteredUsers,
    handelgetRegisterUser,
    handelgetuserfavorites,
    handeluserfavorites,
    handelpatchRegisterUser} = require("../controller/registereduser")

const router = express.Router()

router.route("/").get(handelAllRegisteredUsers).post(handelCreateRegisterUser)
router.route('/:userId/favorites').get(handelAuthenticateUser,handelgetuserfavorites).patch(handelAuthenticateUser,handeluserfavorites)
router.route("/profile").get(handelAuthenticateUser,handelgetRegisterUser).patch(handelAuthenticateUser,handelpatchRegisterUser)

module.exports = router
