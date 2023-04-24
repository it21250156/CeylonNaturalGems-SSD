const User = require('../models/users.model.js');
const generateToken = require('../utils/generateToken.js');
// import jwt from 'jsonwebtoken'
const asyncHandler = require('express-async-handler');

// @desc    Auth user & get token
// @route   POST /users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      title: user.title,
      userType: user.userType,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      confirmPassword: user.confirmPassword,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      error: 'Invalid email and password',
    });
  }
});


// @desc    Register a new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { title , userType , firstName , lastName , email, phone , password , confirmPassword } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    title,
    userType,
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
  });

  if (user) {
    res.status(201).json({
        _id: user._id,
        title: user.title,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        confirmPassword: user.confirmPassword,
        token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


//*************************************************** */

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
// }

// // signup a user
// const registerUser = async (req, res) => {
//   const {title, userType ,firstName , lastName ,  email, phone , password , confirmPassword} = req.body

//   try {
//     const user = await User.signup(title, userType ,firstName , lastName ,  email, phone , password , confirmPassword)

//     // create a token
//     const token = createToken(user._id)

//     res.status(200).json({email, token})
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// }

//****************************************************** */

// @desc    Get user profile
// @route   GET /users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
        _id: user._id,
        title: user.title,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        confirmPassword: user.confirmPassword,
        token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.userType = req.body.userType || user.userType;
    user.email = req.body.email || user.email;
    user.title = req.body.title || user.title;
    user.phone = req.body.phone || user.phone;
    user.confirmPassword = req.body.confirmPassword || user.confirmPassword;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      title: updatedUser.title,
      userType: updatedUser.userType,
      confirmPassword: updatedUser.confirmPassword,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.userType = req.body.userType || user.userType;
    user.email = req.body.email || user.email;
    user.title = req.body.title || user.title;
    user.phone = req.body.phone || user.phone;
    user.confirmPassword = req.body.confirmPassword || user.confirmPassword;

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        title: updatedUser.title,
        userType: updatedUser.userType,
        confirmPassword: updatedUser.confirmPassword,
        token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports =  {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
