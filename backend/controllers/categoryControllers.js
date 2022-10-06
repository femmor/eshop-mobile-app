const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(categories);
});

const addCategory = asyncHandler(async (req, res) => {
  const { name, color, icon, image } = req.body;

  const category = new Category({
    name,
    color,
    icon,
    image,
  });

  await category.save();

  if (!category) {
    res.status(404).send('Category could not be created');
  }

  res.send(category);
});

module.exports = {
  getCategories,
  addCategory,
};
