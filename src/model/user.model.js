


const express = require('express')

const mongoose = require('mongoose')

const bcrypt = require("bcrypt")

require('dotenv').config({ path: './env' });

const jwt = require("jsonwebtoken")



const ACCESS_TOKEN_KRY = "BEST_WEB_DEVELOPER"

const REFRESH_TOKEN_KEY = "PRO_WEB_DEVELOPER"


const User_schema = new mongoose.Schema({


    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {

        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true
    },
    RefToken: {
        type: String,
    },
    otp: {
        type: String,
        
      },
    shopping_info: {

        street: String,
        city: String,
        state: String,
        country: String,
        pincode: String
    },
    payment_info: {
        card_number: String,
        expiry_date: String,
        cvv: String
    },





}, { timestamps: true })




// Define a function to send emails















User_schema.pre('save', async function (next) {



    // console.log(`pre mathod ${this}`) // out put :  pre mathod {
    // //     username: 'kushal',
    // //     email: 'kushal@gmail.com',
    // //     password: 'kushal3005',
    // //     _id: new ObjectId('65cb923252a03e8243e0567c'),
    // //     createdAt: 2024-02-13T16:00:50.051Z,
    // //     updatedAt: 2024-02-13T16:00:50.051Z
    // //   }



    const myuser = this


  


    if (!myuser.isModified('password')) {

        next()
    }

    

    // convart normal password to hash password

    try {

        myuser.password = await bcrypt.hash(myuser.password, 10)

        next()

    } catch (error) {

        console.log(`password bcrypt poblem ${error}`);

        next(error);

    }


})





// json web tokan start



User_schema.methods.generateToken = async function () {

    try {
        return jwt.sign({

            _id: this._id,
            email: this.email,
            username: this.username,

        }, ACCESS_TOKEN_KRY, { expiresIn: "2d" });
    } catch (error) {

        console.log(`jwt token error ${error}`);

    }



}







User_schema.methods.refrashToken = async function () {



    try {

        return jwt.sign({

            _id: this._id,
            email: this.email,
            username: this.username,
        }, REFRESH_TOKEN_KEY, { expiresIn: "1d" })

    } catch (error) {

        console.log(`jwt refrash token error ${error}`);
    }

}













module.exports = mongoose.model('User', User_schema)