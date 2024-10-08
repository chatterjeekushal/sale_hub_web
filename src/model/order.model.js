const mongoose = require('mongoose');
const uuid = require('uuid');
const User = require('../model/user.model.js'); // Adjust path as needed

const order_schema = new mongoose.Schema({
    user_detale: {
        type:Object
    },

    products: 
        {
            productid: {
                type: String,
                
            },
            productname: {
                type: String,
                
            },
            productsize: {
                type: String,
                
            },
            productimage: {
                type: String,
                
            },
            quantity: {
                type: Number,
            
            },
            price: {
                type: Number,
                
            }
        },
    

    price_detale: {
        price: {
            type: Number,
            
        },
        platform_fee: {
            type: Number,
            
        },
        delivery_chages: {
            type: String,
            
        },
        total_price: {
            type: Number,
            
        }
    },

    status: {
        type: {
            type: Boolean,
            
        },
        payment: {
            type: Boolean,
            
        },
        delivery: {
            type: Boolean,
            
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', order_schema);
