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

  res.status(200).send(categories);
});

/* Get Single Category */
const getSingleCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(500).json({
      success: false,
      message: 'Category not found',
    });
  } else {
    res.status(200).send(category);
  }
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

/* Update Category */
const updateCategory = asyncHandler(async (req, res) => {
  const { name, color, icon, image } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
      color,
      icon,
      image,
    },
    {
      new: true,
    }
  );

  if (!category) {
    res.status(404).send({
      success: false,
      message: 'Category could not be updated',
    });
  } else {
    res.send({
      success: true,
      message: 'Category updated successfully',
    });
  }
});

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
};
