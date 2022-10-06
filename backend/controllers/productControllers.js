const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler(async (req, res) => {
  res.send('Getting all products...');
});

module.exports = {
  getProducts,
};
