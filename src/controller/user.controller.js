

const express = require('express')

const body = require("body-parser")

const path = require("path")

const User = require("../model/user.model.js")

const Wishlist = require("../model/wisglist.model.js")

const bcrypt = require("bcrypt")

const otpGenerator = require('otp-generator');

const nodemailer = require("nodemailer");

const Otp = require("../model/otp.model.js")
const { error } = require('console')

const shoesData = require("../webjson/shoes.json.js")
const { request } = require('http')




const GanarateToken = async (userid) => {

    try {
        const userexist = await User.findById(userid)


        const accessToken = await userexist.generateToken()

        const refreshToken = await userexist.refrashToken()



        userexist.RefToken = refreshToken

        await userexist.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {

        console.log(`token ganarate error ${error}`);
    }

}




// send mail




const sendVerifyMail = async (name, email, user_id, otp_detail) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'chatterjeekushal448@gmail.com',
                pass: 'drlz bmfi kkia dwkv ' // use environment variables for credentials
            }
        });

        const mailOptions = {
            from: 'chatterjeekushal448@gmail.com',
            to: email,
            subject: 'salehub.com',
            html: `
                Hi ${name}, welcome to <b>salehub.com</b> for trending fashion here.<br><br>
                ${name}, thank you for registering on our website. Please verify your email.<br><br>
                Your verification email OTP is <b>${otp_detail}</b>.
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email has been sent:", info.response);
    } catch (error) {
        console.log("Mail error:", error);
    }
};

// Example usage:
// sendVerifyMail('John Doe', 'johndoe@example.com', '123456');



const ragister_user = async (req, res) => {

    try {
        let { username, email, password, phoneNo, street, city, country, pincode, } = req.body



        // console.log(username);

        const user = new User({ username: username, email: email, password: password, phoneNo: phoneNo, shopping_info: { street: street, city: city, country: country, pincode: pincode, } })


        const olradyragister = await User.findOne({ email: email })

        console.log(user._id);

        if (olradyragister) {

            console.log("user exgist this email");
        }

        else {

            const user_data = await user.save()

            const otp_detale = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

            console.log(otp_detale, 'otp is');

            await sendVerifyMail(username, email, user_data._id, otp_detale);



            const otp = new Otp({ email: email, otp: otp_detale })

            const otp_data = await otp.save()

            const { accessToken, refreshToken } = await GanarateToken(user._id)

            const actionUrl = '/user/salehub';

            // send cookie

            const options = {

                httpOnly: true,
                secure: true,
            }


            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .render(path.resolve('./views/otp.ejs'), { formAction: actionUrl })

        }
    } catch (error) {
        console.log("user registration error", error);
    }



}









const otp_varify = async (req, res) => {
    try {
        let otp = req.body.otp;

        if (!otp) {
            console.log("Please enter the OTP");
            return res.status(400).json({ message: "Please enter the OTP" });
        }

        const otp_data = await Otp.findOne({ otp });

        if (!otp_data) {
            console.log("Please enter the correct OTP");
            return res.status(400).json({ message: "Please enter the correct OTP" });
        }

        // const userid = await User.findById(req.decodeduser._id);



        return res.redirect(307, "http://localhost:3000/user/web")

    } catch (error) {
        console.log("OTP verification error", error);
        return res.status(500).json({ message: "OTP verification error" });
    }
};




const get_web = async (req, res) => {

    const userid = await User.findById(req.decodeduser._id);

    res.render(path.resolve('./views/index.ejs'), { userid, shoes: shoesData })
}




// const user_wish_list = async (req, res) => {
//     try {
//         let { product_id, product_name, product_price, prodect_image } = req.body

//         console.log(product_name);

//         const wishlist = new Wishlist({ product_id: product_id, product_name: product_name, product_price: product_price, prodect_image: prodect_image })

//         const wishlistData = await wishlist.save();
//         res.json(wishlistData);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// impotent: wishlist model ar product id hoba user er id 







// const show_wishlist = async (req, res) => {

//     await User.findByIdAndUpdate(
//         "6635f62f9e1cef6cc068ab15",
//         { $set: { "wishlist.product_id": "663dcbbafae77d77dda57271" } },
//         { new: true } // This option returns the modified document rather than the original one
//     );


//     const mydata = await User.find({ _id: "6635f62f9e1cef6cc068ab15" }).populate({
//         path: "wishlist.product_id",
//         model: "Wishlist" // Replace "Product" with the actual model name of your product
//     });

//     res.json({ msg: mydata });



// }







const login_user = async (req, res) => {


    try {

        let { email, password } = req.body

        console.log(email);


        let userexit = await User.findOne({ email })

        if (!userexit) {

            throw new Error("invalid user plese ragister")


        }

        const password_compare = await bcrypt.compare(password, userexit.password)


        if (password_compare === false) {

            throw new Error("invalid password try again")

        }


        const { accessToken, refreshToken } = await GanarateToken(userexit._id)





        // send cookie

        const options = {

            httpOnly: true,
            secure: true,
        }


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .redirect(307, "http://localhost:3000/user/web")
    } catch (error) {

        throw new Error("user login function error", error)
    }




}




const forgot_pass = async (req, res) => {

    res.render(path.resolve('./views/forgot_pass_email.ejs'))
}






const forgot_pass_email_send = async (req, res) => {

    try {

        let email = req.body.forgot_email

        console.log(`forgot_pass_email ${email}`);

        const varify_forgot_email = await User.findOne({ email })

        if (!varify_forgot_email) {

            console.log("your email address not ragister");

        }

        const otp_detale = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

        console.log(otp_detale, 'otp is');

        await sendVerifyMail(varify_forgot_email.username, varify_forgot_email.email, "hj", otp_detale);


        const otp = new Otp({ email: email, otp: otp_detale })

        const otp_data = await otp.save()

        const actionUrl = '/user/forgot_pass_otp_varify';

        res.render(path.resolve('./views/otp.ejs'), { formAction: actionUrl })


    } catch (error) {

        console.log("forgos pass email send eror ", error);


    }
}



const forgot_pass_otp_varify = async (req, res) => {

    let otp = req.body.otp;

    if (!otp) {
        console.log("Please enter the OTP");
        return res.status(400).json({ message: "Please enter the OTP" });
    }

    const otp_data = await Otp.findOne({ otp });

    if (!otp_data) {
        console.log("Please enter the correct OTP");
        return res.status(400).json({ message: "Please enter the correct OTP" });
    }

    res.render(path.resolve('./views/conform_pass.ejs'))

}


const forgot_pass_reset_password = async (req, res) => {

    let { email, update_password } = req.body;



    console.log(email, "email");
    console.log(update_password, "password");

    // Hash the new password
    const hashedPassword = await bcrypt.hash(update_password, 10);

    // Log the hashed password (not recommended for production)
    console.log(hashedPassword, "hashed password");

    const filter = { email: email };

    const update_pass = await User.findOneAndUpdate(filter, { $set: { password: hashedPassword } }, { new: true });

    res.render(path.resolve('./views/login.ejs'))
}





// logout function



const user_logout = async function (req, res) {

    try {
        await User.findByIdAndUpdate(req.decodeduser._id, { $set: { RefToken: null } }, { new: true })

        // Set options for cookie clearing
        const options = {
            httpOnly: true,
            secure: true, // Consider setting this based on your deployment environment
        };

        // Clear both access and refresh tokens from cookies

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ msg: "User logged out" });
    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}



// phone pe pement getway function
























module.exports = { ragister_user, login_user, user_logout, otp_varify, get_web, forgot_pass, forgot_pass_email_send, forgot_pass_otp_varify, forgot_pass_reset_password, }