const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// import validator from 'validator' // kalinga add validator

const adminSchema = mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      confirmPassword: {
        type: String,
        required: true
      },
    },
);

adminSchema.methods.matchPassword = async function (enteredPassword) {
  //return await bcrypt.compare(enteredPassword, this.password);
  return enteredPassword === this.password
};

const Admin = mongoose.model('admin', adminSchema);

module.exports =  Admin;