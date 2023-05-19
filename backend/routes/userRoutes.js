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

router.route('/Register').post(registerUser) ;
router.post('/login', authUser);

router.get('/' , getUsers)
router.get('/:id' , getUserById)
router.delete('/:id' , deleteUser)
router.patch('/:id' , updateUser)
router.patch('/:id' , resetpassword)

router
  .route('/profile/:id')
  .get(protect, getUserProfile)
router
  .route('/profile/:id')



//forgot password
router.post('/forgotpassword', forgotpassword)
router.post('/resetpassword/:token' , forgotpasswordtoken )

module.exports =  router;
