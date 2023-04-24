const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jewellerySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    gemstone: {
        type: String,
        required: true
    },
    metal: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('jewelleries', jewellerySchema);