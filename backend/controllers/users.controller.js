const User = require("../models/users.model.js");
const generateToken = require("../utils/generateToken.js");
const asyncHandler = require("express-async-handler");

const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
      error: "Invalid email and password",
    });
  }
});

// @desc    Register a new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    title,
    userType,
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
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
    throw new Error("Invalid user data");
  }
});

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
    throw new Error("User not found");
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
    throw new Error("User not found");
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
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
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
    user.password = req.body.password || user.password;
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
      password: updateUser.password,
      confirmPassword: updatedUser.confirmPassword,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// reset password

const resetpassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.password = req.body.password || user.password;
    user.confirmPassword = req.body.confirmPassword || user.confirmPassword;

    const updatedUser = await user.save();

    res.json({
      password: updatedUser.password,
      confirmPassword: updatedUser.confirmPassword,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//forgot password

const forgotpassword = asyncHandler(async (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }

    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ error: "No account with that email address exists." });
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
        user
          .save()
          .then(() => {
            const transporter = nodemailer.createTransport({
              service: "ProtonMail",
              auth: {
                user: "ceylonnaturalgems1@gmail.com",
                pass: "Ceylon@1234",
              },
            });

            const mailOptions = {
              from: "ceylonnaturalgems1@gmail.com",
              // to: user.email,
              to : "kalingajayathilaka@gmail.com",
              subject: "Password Reset",
              html: `
                <p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
                <p>Click <a href="http://localhost:3000/resetpassword/${token}">here</a> to reset your password.</p>
              `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                return res
                  .status(500)
                  .json({
                    error: "An error occurred. Please try again later. 111111",
                  });
              } else {
                return res.json({
                  message: "Email sent. Please check your inbox.",
                });
              }
            });
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(500)
              .json({ error: "An error occurred. Please try again later.222222" });
          });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(500)
          .json({ error: "An error occurred. Please try again later." });
      });
  });
});

const forgotpasswordtoken = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.password;

  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({
            error:
              "Invalid or expired token. Please request a new password reset.",
          });
      }

      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      user
        .save()
        .then(() => {
          return res.json({
            message:
              "Password reset successful. You can now log in with your new password.",
          });
        })
        .catch((error) => {
          console.log(error);
          return res
            .status(500)
            .json({ error: "An error occurred. Please try again later. kali" });
        });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later. vihii" });
    });
});

module.exports = {
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
  forgotpasswordtoken,
};
