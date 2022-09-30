const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const morgan = require('morgan');
const Product = require('./models/productModel');
const productRoutes = require('./routes/productRoutes');

const app = express();

dotenv.config();

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(`${api}/products`, productRoutes);

app.get(`${api}/products`, (req, res) => {
  const products = {
    id: 1,
    name: 'Product 1',
    price: 100,
    quantity: 1,
  };

  res.send(products);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  res.send(newProduct);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Connection failed: ' + error);
  }
};

startServer();
