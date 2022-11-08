const express = require('express');
const {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

// Get users list
router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
