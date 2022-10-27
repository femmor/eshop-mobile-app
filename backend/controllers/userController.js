const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get users list
const getUsersList = asyncHandler(async (req, res) => {
  const userList = await User.find().select('-passwordHash');

  if (!userList) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(userList);
});

// Get single user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');

  if (!user) {
    res.status(500).json({
      success: false,
      message: 'User not found',
    });
  } else {
    res.status(200).send(user);
  }
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

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }

  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).send({
      user: user.email,
      token,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Password is incorrect',
    });
  }
});

module.exports = {
  getUsersList,
  getUser,
  createUser,
  loginUser,
};
