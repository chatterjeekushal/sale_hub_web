


const express = require('express')

const mongoose = require('mongoose')

require('dotenv').config({ path: './env' });

const Wish_list_schema = new mongoose.Schema({


product_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
product_name:{
    type:String,
},
product_price:{
    type:Number
},
prodect_image:{
    type:String
},


}, { timestamps: true })







module.exports = mongoose.model('Wishlist', Wish_list_schema)