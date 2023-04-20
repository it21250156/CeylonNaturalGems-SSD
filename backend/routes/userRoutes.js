import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/users.controller.js';
import { protect } from '../middleware/authMiddleware.js';

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

export default router;
