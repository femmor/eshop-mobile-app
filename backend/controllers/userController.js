const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

// Get users list
const getUsersList = asyncHandler(async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(userList);
});

// Add a user
const createUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    street,
    apartment,
    city,
    zip,
    country,
    phone,
    isAdmin,
  } = req.body;

  const user = new User({
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    street,
    apartment,
    city,
    zip,
    country,
    phone,
    isAdmin,
  });

  await user.save();

  if (!user) {
    res.status(404).send('User could not be created');
  }

  res.send(user);
});

module.exports = {
  getUsersList,
  createUser,
};
