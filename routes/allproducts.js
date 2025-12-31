const express = require('express')
const {handelAllproducts,handelgetAllFavproducts,handelSimilarproducts,handelproductdelete,handelgetAllproducts,handelgetprimeproducts,handelgetproductd,handelputproductd,handleQueryParams} = require('../controller/allproducts')
const {handelAuthenticateUser} = require("../middleware/authMiddleware")
const router = express.Router()

router.route("/favorites").post(handelAuthenticateUser,handelgetAllFavproducts)
router.route("/prime").get(handelAuthenticateUser,handelgetprimeproducts)
router.route("/similarproducts").post(handelAuthenticateUser,handelSimilarproducts)
router.route("/").get(handelAuthenticateUser,handleQueryParams).post(handelAuthenticateUser,handelAllproducts)
router.route("/:id").get(handelgetproductd).patch(handelputproductd).delete(handelproductdelete)


module.exports= router