const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

/* Get products */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (!products) {
    res.status(404).send({
      success: false,
      message: 'No products found',
    });
  }

  return res.status(200).send(products);
});

/* Add product */
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;

  // Validate if category exists
  const category = await Category.findById(req.body.category);

  if (!category) {
    res.status(404).send({
      success: false,
      message: 'Category not found',
    });
  }

  const product = new Product({
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  });

  await product.save();

  if (!product) {
    return res.status(500).send({
      success: false,
      message: 'Product could not be created',
    });
  }

  return res.status(200).send(product);
});

module.exports = {
  getProducts,
  addProduct,
};
