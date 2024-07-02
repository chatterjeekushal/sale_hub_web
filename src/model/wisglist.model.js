


const express = require('express')

const mongoose = require('mongoose')

require('dotenv').config({ path: './env' });

const Wish_list_schema = new mongoose.Schema({


    product_id: {
        type: String,
    },
    product_name: {
        type: String,
    },
    product_image: {
        type: Array,
    },
    product_price: {
        type: String,
    },
    product_gender:{
        type:String,
    },
    product_color:{
        type:String,
    },
}, { timestamps: true })







module.exports = mongoose.model('Wishlist', Wish_list_schema)