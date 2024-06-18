


const express = require('express')

const app = express()

const router = express.Router()



const { ragister_user, user_wish_list, login_user,user_logout,otp_varify } = require("../controller/user.controller.js")

const varifyjwt =require("../middleware/auth.js")

app.set('view engine', 'ejs')


router.get("/", (req, res) => {

    res.render("from")
})

router.get("/login", (req, res) => {

    const from = `
    <form action="/user/login" method="POST">
      
      <input type="email"  name="email" ><br>
    
      <input type="password"  name="password" ><br><br>
      <input type="submit" value="Submit">
    </form>`

    res.send(from)
})



router.get("/salehub.com", (req, res) => {

  const from = `
 
  <h1>otp send</h1>

  `

  res.send(from)
})





router.route("/singup").post(ragister_user)
router.route("/salehub").post(varifyjwt,otp_varify)
router.route("/wish").post(user_wish_list)
router.route("/login").post(login_user)
router.route("/logout").get(varifyjwt,user_logout)

// router.route("/wishdata").post(show_wishlist)




module.exports = router