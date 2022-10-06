const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');

/* Get categories */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(categories);
});

/* Add Category */
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

/* Delete Category */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    res.status(404).send({
      success: false,
      message: 'Category could not be deleted',
    });
  } else {
    res.send({
      success: true,
      message: 'Category deleted successfully',
    });
  }
});

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
};
