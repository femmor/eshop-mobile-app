const express = require('express');
const {
  getProducts,
  addProduct,
  getProduct,
} = require('../controllers/productControllers');

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.get('/:id', getProduct);

module.exports = router;
