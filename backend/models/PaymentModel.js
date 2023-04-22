const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PaymentSchema = new Schema({
      amount: {
        type: Number,
        required: true
      },
      pmethod: {
        type: String,
        required: true
      },
      dmethod: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      phoneNo: {
        type: Number,
        required: true
      },
      dStatus:{
        type:Number
      },
      orderID:{
        type:String
      },
      userID:{
        type:String
      }
}, {timestamps: true})

module.exports = mongoose.model('Payment' , PaymentSchema)
