const User = require('../models/users.model.js');
const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  resetpassword,
  forgotpassword,
  forgotpasswordtoken
} = require('../controllers/users.controller.js');
const { protect } = require('../middleware/authMiddleware.js');
const passport = require('passport');

// Register route
router.route('/Register').post(registerUser);

// Login route
router.post('/login', authUser);

// OAuth login route (e.g., Google)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// OAuth callback route
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Successful authentication, redirect home or to a specific page.
  res.redirect('/');
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Protected routes
router.get('/' , getUsers);
router.get('/:id' , getUserById);
router.delete('/:id' , deleteUser);
router.patch('/:id' , updateUser);
router.patch('/:id' , resetpassword);

router
  .route('/profile/:id')
  .get(protect, getUserProfile);

// Forgot password routes
router.post('/forgotpassword', forgotpassword);
router.post('/resetpassword/:token' , forgotpasswordtoken);

module.exports = router;
