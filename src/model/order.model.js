
const express = require('express')

const mongoose = require('mongoose')

const User = require("../model/user.model.js")

const order_schema = new mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            productname: {
                type: String
            },
            productsize: {
                type: String
            },
            productimage:{
                type:String
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },

            price: {
                type: Number,
                required: true
            }

        }
    ],

    totalprice: {
        type: Number,
        required: true
    },

    status: {
        type: Boolean,

        payment: Boolean,

        delivery: Boolean
    },

}, { timestamps: true })

module.exports = mongoose.model('Order', order_schema);