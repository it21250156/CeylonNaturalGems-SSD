const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// import validator from 'validator' // kalinga add validator

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

//******************************************************** */
// static signup method
// userSchema.statics.signup = async function(title, userType ,firstName , lastName ,  email, phone , password , confirmPassword) {

//   // validation
//   if (!title || !userType || !firstName || !lastName ||  !email || !phone || !password || !confirmPassword) {
//     throw Error('All fields must be filled')
//   }
//   if (!validator.isEmail(email)) {
//     throw Error('Email not valid')
//   }
//   if (!validator.isStrongPassword(password)) {
//     throw Error('Password not strong enough')
//   }
//   if (password != confirmPassword){
//     throw Error('Comfirm password not match with Password')
//   }

//   if( !validator.isMobilePhone(phone) ) {
//     throw Error('Phone Number not valid')
//   }

//   const exists = await this.findOne({ email })

//   if (exists) {
//     throw Error('Email already in use')
//   }

//   const salt = await bcrypt.genSalt(10)
//   const hash = await bcrypt.hash(password, salt)
//   const hashConfirm = await bcrypt.hash(confirmPassword, salt)

//   const user = await this.create({title, userType ,firstName , lastName ,  email, phone , password : hash , confirmPassword : hashConfirm})

//   return user
// }

//*************************************************************** */

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
