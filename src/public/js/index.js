



// catalog .js



let catalog_image_main1=document.querySelector("#catalog_image_main1")

//console.log(catalog_image_main1);

let circle_catalog1=document.querySelectorAll("#circle_catalog1")

//console.log(circle_catalog1);

Array.from(circle_catalog1).forEach((element,index) => {
    
    element.addEventListener('click',function(){

        catalog_image_main1.src=`../public/img/slide1image/image${index}.jpg`
        
    })
});





// slide 2

let catalog_image_main2=document.querySelector("#catalog_image_main2")

let circle_catalog2=document.querySelectorAll("#circle_catalog2");


Array.from(circle_catalog2).forEach((element,index) => {


    element.addEventListener('click',function(){

        catalog_image_main2.src=`../public/img/slide2image/image${index}.jpg`
    })
    
});



//slide 3


let catalog_image_main3=document.querySelector("#catalog_image_main3")

let circle_catalog3=document.querySelectorAll("#circle_catalog3")


Array.from(circle_catalog3).forEach((element,index) => {


    element.addEventListener('click',function(){

        catalog_image_main3.src=`../public/img/slide3image/image${index}.jpg`
    })
    
});


let catalog_image_main4=document.querySelector("#catalog_image_main4")

let circle_catalog4=document.querySelectorAll("#circle_catalog4")


Array.from(circle_catalog4).forEach((element,index) => {


    element.addEventListener('click',function(){

        catalog_image_main4.src=`../public/img/slide4image/image${index}.jpg`
    })
    
});


let catalog_image_main5=document.querySelector("#catalog_image_main5")

let circle_catalog5=document.querySelectorAll("#circle_catalog5")


Array.from(circle_catalog5).forEach((element,index) => {


    element.addEventListener('click',function(){

        catalog_image_main5.src=`../public/img/slide5image/image${index}.jpg`
    })
    
});


let catalog_image_main6=document.querySelector("#catalog_image_main6")

let circle_catalog6=document.querySelectorAll("#circle_catalog6")


Array.from(circle_catalog6).forEach((element,index) => {


    element.addEventListener('click',function(){

        catalog_image_main6.src=`../public/img/slide6image/image${index}.jpg`
    })
    
});



let catalog_image_main7=document.querySelector("#catalog_image_main7")

let circle_catalog7=document.querySelectorAll("#circle_catalog7")


Array.from(circle_catalog7).forEach((element,index) => {


    element.addEventListener('click',function(){

        catalog_image_main7.src=`../public/img/slide7image/image${index}.jpg`
    })
    
});




let catalog_image_main8=document.querySelector("#catalog_image_main8")

let circle_catalog8=document.querySelectorAll("#circle_catalog8")


Array.from(circle_catalog8).forEach((element,index) => {


    element.addEventListener('click',function(){

        catalog_image_main8.src=`../public/img/slide8image/image${index}.jpg`
    })
    
});











// feacureed_product.js





let color_circles = document.querySelectorAll(".color_circle");

let product_color = document.getElementById("product_color")

let product_price = document.querySelector(".product_price")

let product_image = document.querySelector("#product_image");

//console.log(product_image);

//console.log(color_circles);

Array.from(color_circles).forEach((element, index) => {


    element.addEventListener('click', function (e) {

        let color_target = e.target.id

        product_color.innerHTML = color_target;

        if (color_target == "Olivegreen") {

            product_price.innerHTML = "$120.00"
            product_image.src = "../public/img/product_image/image0_olivegreen.jpg"
        }

        else if (color_target == "Black") {
            product_price.innerHTML = "$140.00"

            product_image.src = "../public/img/product_image/image1_black.jpg"
        }

        else if (color_target == "Peich") {
            product_price.innerHTML = "$100.00"

            product_image.src = "../public/img/product_image/image2_peich.jpg"

        }


        else if (color_target == "satewhite") {
            product_price.innerHTML = "$160.00"

            product_image.src = "../public/img/product_image/image3_white.jpg"
        }


        else if (color_target == "purple") {
            product_price.innerHTML = "$150.00"

            product_image.src = "../public/img/product_image/image4_purple.jpg"
        }


        else {

            console.log("price not abalabel");
        }


    })

});









let product_panel_box = document.querySelectorAll(".product_panel_box");

let product_size = document.querySelector("#product_size")

console.log(product_size);

console.log(product_panel_box);



Array.from(product_panel_box).forEach((element, index) => {


    element.addEventListener('click', function (e) {

        product_size.innerHTML = e.target.id

    })
});


let close_data=document.querySelector(".notyfy_box_closer")

close_data.addEventListener('click',function(){

let pre=close_data.parentElement

pre.parentElement.style.display="none"

})


let dis_size=document.querySelectorAll(".dis")

dis_size.forEach((element, index) => {
    element.addEventListener('click', function(e) {
    
        if (e.target.id=="M" || e.target.id=="XL") {

            let pre = close_data.parentElement;
            pre.parentElement.style.display = "flex";
          
        } else {
            alert("something wrong");
        }
    });
});






// nav.js






let homelink=document.getElementById("home_list");

let navhome=document.querySelector(".nav_home");

let manindocument=document.querySelector("*");



homelink.addEventListener("click",()=>{

navhome.classList.toggle("d_none");

})



// manindocument.addEventListener("mouseenter",()=>{

//     navhome.classList.add("d_none");
    
//     })



let bloglink=document.getElementById("blog_list");

let navblog=document.querySelector(".nav_blog")


bloglink.addEventListener("click",()=>{

    navblog.classList.toggle("d_none");
    
    })






        // search area java script


        let searchlink=document.querySelector(".search_list");

        let searcharea=document.querySelector(".search_area");

    searchlink.addEventListener("click",()=>{

searcharea.classList.remove("search_area_top")

    })

    let close=document.querySelector(".close")

    close.addEventListener('click',()=>{

        searcharea.classList.add("search_area_top");
        
    })


    let account=document.querySelector(".account");

    let account_list=document.querySelector(".account_list");

    account.addEventListener('click',function(){

        account_list.classList.toggle("d_none")

    })

    // manindocument.addEventListener("mouseenter",()=>{

    //     account_list.classList.add("d_none");
        
    //     })











    // slider .js



    

flag = 0;

let slider = document.querySelectorAll("#slider");

slideshow(flag)

function slideshow(num) {


    let slider = document.querySelectorAll("#slider");

    let dots = document.querySelectorAll(".dot");



    if (num == slider.length) {

        flag = 0
        num = 0
    }

    if (num < 0) {

        flag = slider.length - 1
        num = slider.length - 1
    }

    
    for (i = 0; i < slider.length; i++) {


        slider[i].style.display = "none"

    }

    flag++;

    for (k = 0; k < dots.length; k++) {


        dots[k].classList.remove("bg_color")

    }

    dots[num].classList.add("bg_color")

    slider[num].style.display = "block"



    slider[num].style.transition = "1s ease-in-out"


    setTimeout(() => {

        slideshow(flag);
    }, 5000);

}


