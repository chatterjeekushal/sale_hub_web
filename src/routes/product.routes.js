



const express = require('express')

const app = express()

const router = express.Router()


const varifyjwt =require("../middleware/auth.js")

const {get_url,get_wish,user_order,remove_wish}=require("../controller/poduct.controller.js")

app.set('view engine', 'ejs')



router.route("/product/pd").get(varifyjwt,get_url)


router.route("/product/wish").get(varifyjwt,get_wish)


router.route("/product/order").get(varifyjwt,user_order)


router.route("/product/remove").get(varifyjwt,remove_wish)





module.exports = router

