


const express = require('express')

const app = express()

const router = express.Router()


const { auth, requiresAuth } = require('express-openid-connect');


const { ragister_user,  login_user, user_logout, otp_varify, get_web,forgot_pass,forgot_pass_email_send,forgot_pass_otp_varify,forgot_pass_reset_password } = require("../controller/user.controller.js")

const varifyjwt = require("../middleware/auth.js")

app.set('view engine', 'ejs')


router.get("/", (req, res) => {

  res.render("from")
})

router.get("/login", (req, res) => {

  res.render("login")
})




router.route("/web").post(varifyjwt, get_web)
router.route("/web").get(varifyjwt, get_web)



// router.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });







router.route("/singup").post(ragister_user)
router.route("/salehub").post(varifyjwt, otp_varify)
router.route("/login").post(login_user)
router.route("/logout").get(varifyjwt, user_logout)



// forgot_pss_route

router.route("/forgot_pass").get(forgot_pass)
router.route("/forgot_pass_email").post(forgot_pass_email_send)
router.route("/forgot_pass_otp_varify").post(forgot_pass_otp_varify)
router.route("/forgot_pass_reset_password").post(forgot_pass_reset_password)




// router.route("/wishdata").post(show_wishlist)







module.exports = router