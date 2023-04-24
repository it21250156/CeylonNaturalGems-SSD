const express = require('express');
const {
  addToCart,
  getUserCart,
  deleteCartItem,
  getCartByID,
  updateCartByID,
} = require('../controllers/cartController');

const router = express.Router();

// //GET all gems
// router.get('/gems', getGems);

// //GET single gem
// router.get('/gems/:id', getGem);

//CREATE cart item
router.post('/', addToCart);

//GET user cart item
router.get('/user/:_id', getUserCart);

//GET  cart by id
router.get('/:_id', getCartByID);

//GET  cart by id
router.patch('/:_id', updateCartByID);

// //GET user cart item
// router.get('/user/', getAllUserParts);

//DELETE user cart item
router.delete('/:id', deleteCartItem);

module.exports = router;
