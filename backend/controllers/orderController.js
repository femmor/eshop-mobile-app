const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const asyncHandler = require('express-async-handler');

// Get orders list
const getOrders = asyncHandler(async (req, res) => {
  const orderList = await Order.find().populate('user', 'name').sort({
    dateOrdered: -1,
  });
  if (!orderList) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(orderList);
});

// Get single order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        populate: 'category',
      },
    });
  if (!order) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(order);
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

/* Update Order */
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );

  if (!order) {
    res.status(400).send({
      success: false,
      message: 'Order could not be updated',
    });
  }
  res.send(order);
});

// Delete order
const deleteOrder = asyncHandler((req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async order => {
      if (order) {
        await order.orderItems.map(async orderItem => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        res.status(200).json({
          success: true,
          message: 'Order deleted successfully',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Order could not be deleted',
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        success: false,
        error: err,
      });
    });
});

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
