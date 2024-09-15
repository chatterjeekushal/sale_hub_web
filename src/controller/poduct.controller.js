

const express = require("express")

const body = require("body-parser")

const path = require("path")

const Product = require("../model/product.model.js")

const Wishlist = require("../model/wisglist.model.js")

const varifyjwt = require("../middleware/auth.js")

const User=require("../model/user.model.js")

const Order=require("../model/order.model.js")

const uuid = require('uuid');


const get_url = async (req, res) => {



    let { p_name, p_img, p_price, p_gender, p_color, p_id } = req.query

    // console.log(p_name, p_img, p_id, p_gender, p_price);

    let p_imge = p_img.split(",")

    console.log(p_imge);

    const product = new Product({ product_name: p_name, product_image: p_imge, product_price: p_price, product_gender: p_gender, product_color: p_color, product_id:uuid.v4(),product_user:req.decodeduser._id })

    const product_data = await product.save()

    const find_product = await Product.findOne({ product_user: req.decodeduser._id })



    res.render(path.resolve('./views/product.ejs'), { data: find_product})

}





// wishlist


const get_wish = async (req, res) => {

    let { p_name, p_img, p_price, p_gender, p_color, p_id } = req.query

    // console.log(p_name, p_img, p_id, p_gender, p_price);

    let p_imge = p_img.split(",")

    // console.log(p_imge);

    const product_wish = new Wishlist({ product_name: p_name, product_image: p_imge, product_price: p_price, product_gender: p_gender, product_color: p_color, product_id:uuid.v4(),product_user:req.decodeduser._id  })

    const product_data = await product_wish.save()

    const product_all_data = await Wishlist.find({ product_user: req.decodeduser._id })

    res.render(path.resolve('./views/wishlist.ejs'), {product_all_data})

}



// order 

const user_order=async(req,res)=>{

    let {p_name,p_img,p_price,p_gender,p_color}=req.query

    // Create a new order
    const product_order = new Order({
        userid: req.decodeduser.id,
        products: [{
            productid: uuid.v4(), // Generate unique product ID if needed
            productname: p_name,
            productsize: "M", // Ensure that p_size is provided
            quantity: 1,
            productimage:p_img,
            price: p_price
        }],
        totalprice: p_price * quantity, // Calculate total price
        status: {
            type: true, // Assuming 'type' means 'active' or similar
            payment: false,
            delivery: false
        }
    });
}




module.exports = { get_url, get_wish }