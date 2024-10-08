
const jwt = require("jsonwebtoken"); // import jwt web token

const User = require("../model/user.model.js");




const varifyjwt = async (req, res, next) => {


    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

        // console.log(`this is token request cookie token ${token}`);


        if (!token) {

            throw new Error("unauthoristes request")
        }

        const ACCESS_TOKEN_KRY = "BEST_WEB_DEVELOPER"

        const decodedToken = jwt.verify(token, ACCESS_TOKEN_KRY)


        // console.log(`this is decoded token ${decodedToken}`);


        const decodeduser = await User.findById(decodedToken?._id)

        // console.log(`this is decoded user ${decodeduser}`);

        if (!decodeduser) {

            throw Error("invalid access token")
        }


        req.decodeduser = decodeduser;

        next()
    } catch (error) {

        throw new Error("invalid access token user")

    }

}

module.exports=varifyjwt