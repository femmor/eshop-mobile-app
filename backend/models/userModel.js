const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    street: {
      type: String,
    },
    apartment: {
      type: String,
    },
    city: {
      type: String,
    },
    zip: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
