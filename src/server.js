const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const user_route = require("./routes/user.routes.js");
const product_route = require("./routes/product.routes.js");
const cookie = require('cookie-parser');


const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());
app.use('/user', user_route);
app.use('/user', product_route);

app.use('/public', express.static('public'));



async function database() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/c_com_data', {
      // Removed deprecated options
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}

database();

app.get('/', (req, res) => {
 
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
