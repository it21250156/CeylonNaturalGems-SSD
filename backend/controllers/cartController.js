const Cart = require('../models/cartModel');
const asyncHandler = require('express-async-handler');

const addToCart = asyncHandler(async (req, res) => {
  const { cartitemid, cartquantity, cartuserid } = req.body;
  const cartpaymentid = 'abacccc';
  console.log(req.body);

  const cartItemExists = await Cart.findOne({ cartitemid });

  if (cartItemExists) {
    res
      .status(400)
      .json({ message: 'Item is already exists in a cart', code: 'DUPLICATE' });
  }

  const cart = await Cart.create({
    cartitemid,
    cartquantity,
    cartuserid,
    cartpaymentid,
  });

  if (cart) {
    res.status(201).json(cart);
    // {
    //   _id: cart._id,
    //   cartitemid: cart.cartitemid,
    //   cartquantity: cart.cartquantity,
    //   cartuserid: cart.cartuserid,
    //   cartpaymentid: cart.cartpaymentid,
    // });
  } else {
    res.status(400);
    throw new Error('Invalid cart data');
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const cartItemExists = await Cart.find({
    cartuserid: _id,
  }).exec();

  if (cartItemExists) res.json(cartItemExists);
  else {
    res.json('No matching cart in the database!');
  }
});

const getCartByID = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const cartItemExists = await Cart.find({
    _id: _id,
  }).exec();
  console.log(cartItemExists);
  if (cartItemExists) res.json(cartItemExists);
  else {
    res.json('No matching cart in the database!');
  }
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if (cart) {
    const rmcart = { _id: cart._id, message: 'Item removed' };
    await cart.remove();
    res.json(rmcart);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

module.exports = {
  addToCart,
  getUserCart,
  deleteCartItem,
  getCartByID,
};
