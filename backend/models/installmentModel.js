const mongoose = require('mongoose')

const Schema = mongoose.Schema

const installmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    gemID: {
        type: Schema.Types.ObjectId,
        ref: 'gem',
        required: true,
    },

    planID: {
        type: Schema.Types.ObjectId,
        ref: 'plan',
        required: true,
    },

    noOfMonths: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },
      
    initialPayment: {
        type: Number,
        required: true
      },

    monthlyPayment: {
        type: Number,
        required: true
      },
      
    installmentDates: [{
        type: Date,
        required: true
      }],

    status: {
      type: String,
      required: true
    }
} ) 

module.exports = mongoose.model('installment', installmentSchema )