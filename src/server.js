

const express=require("express")

const bodyParser=require("body-parser")

const path=require("path")

const mongoose=require("mongoose")

const user_route=require("./routes/user.routes.js")

const product_route=require("./routes/product.routes.js")

const cookie = require('cookie-parser') // import cookie parser


const app=express()

const PORT=3000


app.set('views', path.join(__dirname, 'views'))


app.set('view engine', 'ejs')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookie()) // use cookie parser 

app.use('/user', user_route)

app.use('/user',product_route)


app.use('/public', express.static('public'));



async function database() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/c_com_data');
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        // You might want to handle this error in a better way, such as retrying or exiting the application
        process.exit(1);
    }
}

// Call the database function
database();






app.get('/', async (req, res) => {
    
    res.render("index")
});




app.listen(PORT, (req, res) => {

    console.log(`server is run port ${PORT}`);
    
})