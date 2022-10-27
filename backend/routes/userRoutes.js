const express = require('express');
const { getUsersList, createUser } = require('../controllers/userController');

const router = express.Router();

// Get users list
router.get('/', getUsersList);
router.post('/', createUser);

module.exports = router;
