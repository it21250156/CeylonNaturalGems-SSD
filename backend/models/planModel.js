const mongoose = require('mongoose')

const Schema = mongoose.Schema

const planSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    months: {
        type: Number,
        required: true,
    },

    initialPayment: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Plan', planSchema )