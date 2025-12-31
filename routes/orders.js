const express = require('express')
const { createOrder,handelgetordersbyid } = require("../controller/orders");
const {handelAuthenticateUser} = require("../middleware/authMiddleware")

const router = express.Router();

router.route("/").post(handelAuthenticateUser,createOrder);
router.route('/myorders').get(handelAuthenticateUser,handelgetordersbyid);
module.exports= router
