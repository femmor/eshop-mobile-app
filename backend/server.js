const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const morgan = require('morgan');

const app = express();

dotenv.config();

const api = process.env.API_URL;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

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
  const newProduct = req.body;
  console.log(newProduct);

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
