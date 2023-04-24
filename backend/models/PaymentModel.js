const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PaymentSchema = new Schema({

  user:{
    type: Schema.Types.ObjectId,
    ref:'user',
   required:true,
  },

  orderID:{
    type:[String],
    required: true,
  },

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
        type:String,
        default:"pending"
      },
     
      
      // gemID:{
      //   type: Schema.Types.ObjectId,
      //   ref:'gem',
      //   required: true
      // },
      // quantity:{
      //   type: Number,
      //   required: true
      // }
}, {timestamps: true})

module.exports = mongoose.model('Payment' , PaymentSchema)
