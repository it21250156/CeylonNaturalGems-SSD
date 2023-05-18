const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true
      },
      userType: {
        type: String,
        required: true
      },
      firstName:{
        type: String,
        required: true
      },
      lastName:{
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      phone: {
        type: Number,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      confirmPassword: {
        type: String,
        required: true
      },
      resetToken: String,
      resetTokenExpiration: Date
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword , salt);

  if (this.password != this.confirmPassword){
    throw Error('Comfirm password not match with Password')
  }

});

const User = mongoose.model('users', userSchema);

module.exports =  User;
