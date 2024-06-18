

const express = require("express")

const body = require("body-parser")

const path = require("path")

const Product = require("../model/product.model.js")


const get_url = async (req, res) => {



    let { p_name, p_img, p_price, p_gender, p_color, p_id } = req.query

    console.log(p_name, p_img, p_id, p_gender, p_price);

    let p_imge = p_img.split(",")

    console.log(p_imge);

    const product = new Product({ product_name: p_name, product_image: p_imge, product_price: p_price, product_gender: p_gender, product_color: p_color, product_id: p_id })

    const product_data = await product.save()

    const find_product = await Product.findOne({ product_name: p_name })

    let img_value=0

    res.render(path.resolve('./views/product.ejs'), { data: find_product,img_value })

}

module.exports = get_url;