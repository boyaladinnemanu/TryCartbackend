const express = require("express")
const router = express.Router()

const {handelAuthenticateUser} = require("../middleware/authMiddleware")
const {makeprimeuser}=require("../controller/makeprime")

router.route("/").patch(handelAuthenticateUser,makeprimeuser)

module.exports=router