const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

/* Get products */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('category');

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

/* Get single product */
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');

  if (!product) {
    res.status(404).send({
      success: false,
      message: 'Product not found',
    });
  }

  return res.status(200).send(product);
});

/* Update product */
const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.body.id)) {
    res.status(404).send({
      success: false,
      message: 'Invalid product id',
    });
  }

  // Validate category
  const category = await Category.findById(req.body.category);

  if (!category) {
    res.status(404).send({
      success: false,

      message: 'Invalid category',
    });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );

  if (!updatedProduct) {
    res.status(404).send({
      success: false,
      message: 'Product cannot be updated',
    });
  } else {
    return res.status(200).send(updatedProduct);
  }
});

/* Delete product */
const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.body.id)) {
    res.status(404).send({
      success: false,
      message: 'Invalid product id',
    });
  }
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404).send({
      success: false,
      message: 'Product could not be deleted',
    });
  } else {
    res.send({
      success: true,
      message: 'Product deleted successfully',
    });
  }
});

module.exports = {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
