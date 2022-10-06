const express = require('express');
const {
  getCategories,
  addCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
} = require('../controllers/categoryControllers');

const router = express.Router();

router.get('/', getCategories);
router.post('/', addCategory);
router.get('/:id', getSingleCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

module.exports = router;
