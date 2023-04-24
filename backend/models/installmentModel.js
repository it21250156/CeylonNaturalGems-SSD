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

    monthlyPayment: {
        type: Number,
        required: true
    }

} ,{ timestamps: true} ) 

module.exports = mongoose.model('installment', installmentSchema )