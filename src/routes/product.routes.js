



const express = require('express')

const app = express()

const router = express.Router()


const varifyjwt =require("../middleware/auth.js")

const get_url=require("../controller/poduct.controller.js")

app.set('view engine', 'ejs')



router.route("/pd").get(get_url)




module.exports = router