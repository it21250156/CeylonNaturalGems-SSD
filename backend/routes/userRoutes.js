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

router.route('/Register').post(registerUser) //.get(protect , getUsers);
router.post('/login', authUser);

// // Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate token with user ID and role
//     const payload = {
//       userId: user._id,
//       role: user.isAdmin ? "admin" : "user",
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET);

//     res.json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });




//********** */
router.get('/' , getUsers)
router.get('/:id' , getUserById)
router.delete('/:id' , deleteUser)
router.patch('/:id' , updateUser)
router.patch('/:id' , resetpassword)

router
  .route('/profile/:id')
  .get(protect, getUserProfile)
  // .patch(protect, updateUserProfile);
router
  .route('/profile/:id')
  // .delete(protect, deleteUser)
  // .put(protect, updateUser);


//forgot password
router.post('/forgotpassword', forgotpassword)
router.post('/resetpassword/:token' , forgotpasswordtoken )

module.exports =  router;
