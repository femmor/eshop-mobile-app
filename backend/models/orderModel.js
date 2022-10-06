const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    orderItems: {
      type: [orderItem],
      ref: 'OrderItem',
    },
    shippingAddress1: {
      type: String,
      required: true,
    },
    shippingAddress2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    status: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.virtual('id').get(function () {
  return this._id.toString();
});

orderSchema.set('toJSON', {
  virtuals: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
