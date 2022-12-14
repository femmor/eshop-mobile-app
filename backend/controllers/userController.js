const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

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

/* Get User Count */
const getUserCount = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();

  if (!userCount) {
    res.status(404).send({
      success: false,
    });
  }

  return res.status(200).send({ userCount: userCount });
});

/* Delete user */
const deleteUser = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404).send({
      success: false,
      message: 'Invalid user id',
    });
  }
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404).send({
      success: false,
      message: 'User could not be deleted',
    });
  } else {
    res.send({
      success: true,
      message: 'User deleted successfully',
    });
  }
});

module.exports = {
  getUsersList,
  getUser,
  createUser,
  loginUser,
  getUserCount,
  deleteUser,
};
