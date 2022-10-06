const express = require('express');
const {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeatured,
} = require('../controllers/productControllers');

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/get/count', getProductCount);
router.get('/get/featured', getFeatured);

module.exports = router;
