

const express = require('express')

const mongoose = require('mongoose')
const { schema } = require('./user.model')

const User=require("../model/user.model.js")

const product_schema = new mongoose.Schema({


    product_id: {
        type: String,
    },
    product_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
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

module.exports = mongoose.model('Product', product_schema)

