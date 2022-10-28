const express = require('express');
const {
  getUsersList,
  createUser,
  getUser,
  loginUser,
  getUserCount,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Get users list
router.get('/', getUsersList);
router.get('/:id', getUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/get/count', getUserCount);
router.delete('/:id', deleteUser);

module.exports = router;
