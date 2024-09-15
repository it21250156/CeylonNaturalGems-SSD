const Admin = require('../models/PageAdminLoginModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');


const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      confirmPassword: admin.confirmPassword,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({
      error: 'Invalid email and password',
    });
  }
});


  const getAdmins = asyncHandler(async (req, res) => {
    const admin = await Admin.find({});
    res.json(admin);
  });
  
  module.exports = {
    authAdmin,
    getAdmins
  } ;