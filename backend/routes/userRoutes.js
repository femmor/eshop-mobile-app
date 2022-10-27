const express = require('express');
const {
  getUsersList,
  createUser,
  getUser,
} = require('../controllers/userController');

const router = express.Router();

// Get users list
router.get('/', getUsersList);
router.get('/:id', getUser);
router.post('/', createUser);

module.exports = router;
