const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const asyncHandler = require('express-async-handler');

// Get orders list
const getOrders = asyncHandler(async (req, res) => {
  const orderList = await Order.find();
  if (!orderList) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(orderList);
});

// Create Order
const createOrder = asyncHandler(async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async orderItem => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem.id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;

  const {
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
  } = req.body;

  const order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
  });

  await order.save();

  if (!order) {
    res.status(404).send('Order could not be created');
  }

  res.send(order);
});

module.exports = {
  getOrders,
  createOrder,
};
