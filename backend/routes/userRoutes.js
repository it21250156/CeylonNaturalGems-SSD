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
} = require('../controllers/users.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/Register').post(registerUser) //.get(protect , getUsers);
router.post('/login', authUser);
router.get('/' , getUsers)
router.get('/:id' , getUserById)
router.delete('/:id' , deleteUser)
router.patch('/:id' , updateUser)

router
  .route('/profile/:id')
  .get(protect, getUserProfile)
  // .patch(protect, updateUserProfile);
router
  .route('/profile/:id')
  // .delete(protect, deleteUser)
  // .put(protect, updateUser);

module.exports =  router;
