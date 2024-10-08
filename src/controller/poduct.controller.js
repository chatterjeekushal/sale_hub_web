const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Product = require("../model/product.model.js");
const Wishlist = require("../model/wisglist.model.js"); // Fixed typo in import
const User = require("../model/user.model.js");
const Order = require("../model/order.model.js");
const uuid = require('uuid');

const axios = require('axios');

const crypto = require('crypto');



const get_url = async (req, res) => {
    try {
        const { p_name, p_img, p_price, p_gender, p_color } = req.query;
        const p_image = p_img.split(",");

        const product = new Product({
            product_name: p_name,
            product_image: p_image,
            product_price: p_price,
            product_gender: p_gender,
            product_color: p_color,
            product_id: uuid.v4(),
            product_user: req.decodeduser._id
        });

        const product_data = await product.save();
        const find_product = await Product.findOne({ product_user: req.decodeduser._id });

        res.render(path.resolve('./views/product.ejs'), { data: find_product, product_data });
    } catch (error) {
        console.error("Error in get_url:", error);
        res.status(500).send("Internal Server Error");
    }
};

const get_wish = async (req, res) => {
    try {
        const { p_name, p_img, p_price, p_gender, p_color } = req.query;
        const p_image = p_img.split(",");

        const product_wish = new Wishlist({
            product_name: p_name,
            product_image: p_image,
            product_price: p_price,
            product_gender: p_gender,
            product_color: p_color,
            product_id: uuid.v4(),
            product_user: req.decodeduser._id
        });

        const exgist_wishlist = await Wishlist.findOne({ product_name: p_name });



        if (exgist_wishlist) {

            return res.redirect(307, "http://localhost:3000/user/web");

        } else {

            await product_wish.save();


            const product_all_data = await Wishlist.find({ product_user: req.decodeduser._id });

        
            res.render(path.resolve('./views/wishlist.ejs'), { product_all_data });
        }

    } catch (error) {
        console.error("Error in get_wish:", error);
        res.status(500).send("Internal Server Error");
    }
};


const remove_wish = async (req, res) => {
    try {
        const { p_name,p_id,pr_id } = req.query;
        console.log("p_id",p_id,"p_name",p_name,"pr_id",pr_id);
        
        
       const remove_product= await Wishlist.findByIdAndDelete({ _id: pr_id});
       console.log("remove_product",remove_product);
       
        res.redirect(307, "http://localhost:3000/user/web");
    } catch (error) {
        console.error("Error in remove_wish:", error);
        res.status(500).send("Internal Server Error");
    }
};


const user_order = async (req, res) => {
    try {
        const { p_name, p_img, p_price } = req.query;
        const userId = await User.findById(req.decodeduser._id);

        let quantity = 7;
        let total_price = quantity * Number.parseInt(p_price);

        const product_order = new Order({
            user_detale: userId,
            products: {
                productid: uuid.v4(),
                productname: p_name,
                productsize: "M",
                quantity: quantity,
                productimage: p_img,
                price: Number.parseInt(p_price),
            },
            price_detale: {
                price: Number.parseInt(p_price),
                platform_fee: 3,
                delivery_charges: "FREE Delivery",
                total_price: total_price
            },
            status: {
                type: true,
                payment: false,
                delivery: false
            }
        });

        const product_order_detail = await product_order.save();
        res.render(path.resolve('./views/product_order_detale.ejs'), { Product: product_order_detail }); // Use public key for client side
    } catch (error) {
        console.error("Error in user_order:", error);
        res.status(500).send("Error creating order");
    }
};



// const Host_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox'

// const Merchant_ID = "PGTESTPAYUAT"

// const Merchant_Key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"

// const Merchant_Key_Index = 1


// const payment = async (req, res) => {

//     try {
//         const endpoint = "/pg/v1/pay";
//         const marchend_targensan_id = uuid.v4();
//         const userid = 456;

//         const paylord = {
//             "merchantId": Merchant_ID,
//             "merchantTransactionId": marchend_targensan_id,
//             "merchantUserId": userid,
//             "amount": 30000,
//             "redirectUrl": `https://webhook.site/callback-url/${marchend_targensan_id}`,
//             "redirectMode": "REDIRECT",
//             "mobileNumber": "9999999999",

//             "paymentInstrument": {
//                 "type": "PAY_PAGE"
//             }
//         }

//     const buffobj=Buffer.from(JSON.stringify(paylord),"utf-8");

//     const basestring=buffobj.toString("base64");

//     const xverify= crypto.createHash('sha256')
//     .update(basestring + endpoint + Merchant_Key + "###" + Merchant_Key_Index)
//     .digest('hex');


//         const options = {
//             method: 'post',
//             url: `${Host_URL}${endpoint}`,
//             headers: {
//                 accept: 'application/json',
//                 "X-VERIFY":xverify
//             },
//             data: {

//                 request:basestring
//             }
//         };
//         axios
//             .request(options)
//             .then(function (response) {
//                 console.log(response.data);
//                 res.send(response.data)
//             })
//             .catch(function (error) {
//                 console.error(error);

//             });
//     } catch (error) {
//         console.error('Payment request failed:', error.response ? error.response.data : error.message);
//         res.status(500).send({ error: 'Payment request failed', details: error.message });
//     }
// }
















module.exports = { get_url, get_wish, user_order,remove_wish };
