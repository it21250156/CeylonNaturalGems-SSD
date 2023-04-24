const mongoose = require('mongoose')

const Schema = mongoose.Schema

const installmentSchema = new Schema({
    user: {
        type: String,
        required: true,
    },

    gemID: {
        type: String,
        required: true,
    },

    monthlyPayment: {
        type: Number,
        required: true
    }

} ,{ timestamps: true} ) 

module.exports = mongoose.model('installment', installmentSchema )